# -*- coding: utf-8 -*-
"""
Created on Wed Aug 26 11:31:24 2026

@author: SENILA
"""

import sqlite3
import os


# ==========================================
# DATABASE PATH
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE = os.path.join(BASE_DIR, "soasound.db")


# ==========================================
# CONNECTION
# ==========================================

def get_connection():

    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


# ==========================================
# INITIALISATION DATABASE
# ==========================================

def init_database():

    connection = get_connection()

    cursor = connection.cursor()

    # -----------------------------
    # TABLE PRODUCTS
    # -----------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nom TEXT NOT NULL,

            description TEXT,

            prix REAL NOT NULL,

            image TEXT,

            categorie TEXT,

            stock INTEGER DEFAULT 0,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()

    connection.close()


# ==========================================
# GET PRODUCTS
# ==========================================

def get_products():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM products
        ORDER BY id DESC
    """)

    products = cursor.fetchall()

    connection.close()

    return products


# ==========================================
# ADD PRODUCT
# ==========================================

def add_product(
    nom,
    description,
    prix,
    image,
    categorie,
    stock
):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO products
        (
            nom,
            description,
            prix,
            image,
            categorie,
            stock
        )

        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        nom,
        description,
        prix,
        image,
        categorie,
        stock
    ))

    connection.commit()

    product_id = cursor.lastrowid

    connection.close()

    return product_id