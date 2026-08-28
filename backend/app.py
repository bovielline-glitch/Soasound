# -*- coding: utf-8 -*-
"""
Created on Wed Aug 26 11:32:26 2026

@author: SENILA
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

from database import (
    init_database,
    get_products,
    add_product
)


# ==========================================
# FLASK
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():

    return jsonify({
        "status": "success",
        "message": "Bienvenue sur SoaSound API"
    })


# ==========================================
# TEST DATABASE
# ==========================================

@app.route("/api/test-db")
def test_database():

    try:

        init_database()

        return jsonify({
            "status": "success",
            "message": "SQLite fonctionne correctement"
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ==========================================
# GET PRODUCTS
# ==========================================

@app.route("/api/products", methods=["GET"])
def products():

    try:

        data = get_products()

        products_list = []

        for product in data:

            products_list.append({

                "id": product["id"],

                "nom": product["nom"],

                "description": product["description"],

                "prix": product["prix"],

                "image": product["image"],

                "categorie": product["categorie"],

                "stock": product["stock"]

            })

        return jsonify(products_list)

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ==========================================
# ADD PRODUCT
# ==========================================

@app.route("/api/products", methods=["POST"])
def create_product():

    try:

        data = request.get_json()

        nom = data.get("nom")
        description = data.get("description")
        prix = data.get("prix")
        image = data.get("image")
        categorie = data.get("categorie")
        stock = data.get("stock", 0)


        # Vérification

        if not nom:

            return jsonify({
                "status": "error",
                "message": "Le nom du produit est obligatoire"
            }), 400


        if prix is None:

            return jsonify({
                "status": "error",
                "message": "Le prix est obligatoire"
            }), 400


        product_id = add_product(
            nom,
            description,
            prix,
            image,
            categorie,
            stock
        )


        return jsonify({

            "status": "success",

            "message": "Produit ajouté avec succès",

            "id": product_id

        }), 201


    except Exception as e:

        return jsonify({

            "status": "error",

            "message": str(e)

        }), 500


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    init_database()

    print("===================================")
    print("       SoaSound Backend")
    print("===================================")
    print("SQLite : OK")
    print("API : http://127.0.0.1:5000")
    print("===================================")

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=False,

        use_reloader=False

    )