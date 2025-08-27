from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, jwt, time


app = Flask(__name__)
CORS(app) # CORS totalmente abierto


SECRET = "123" # clave débil
DB = "insecure.db"


# Inicialización simple
with sqlite3.connect(DB) as con:
    con.executescript(open("schema.sql").read())


# Helpers inseguros


def q(query):
    with sqlite3.connect(DB) as con:
        cur = con.cursor()
        cur.execute(query) # ❌ vulnerable a SQLi
        con.commit()
        try:
            return cur.fetchall()
        except:
            return []
def qi(query):
    with sqlite3.connect(DB) as con:
        cur = con.cursor()
        cur.execute(query) # ❌ vulnerable a SQLi
        con.commit()
        try:
            return cur.lastrowid
        except:
            return []


@app.post('/api/register')
def register():
    data = request.get_json() or {}
    username = data.get('username', '')
    password = data.get('password', '') # ❌ sin hash
    try:
        q(f"INSERT INTO users(username,password) VALUES('{username}','{password}')")
        return jsonify({"ok": True})
    except Exception as e:
        # ❌ fuga de información
        return jsonify({"ok": False, "error": str(e)}), 400


@app.post('/api/login')
def login():
    data = request.get_json() or {}
    username = data.get('username', '')
    password = data.get('password', '')
    rows = q(f"SELECT id FROM users WHERE username='{username}' AND password='{password}'")
    if rows:
        token = jwt.encode({"sub": username}, SECRET, algorithm='HS256') # ❌ sin exp
        return jsonify({"token": token})
    return jsonify({"error": "credenciales"}), 401


@app.get('/api/guests')
def list_guests():
    rows = q("SELECT id, name, table_number, side, obsequio FROM guests")
    rows_gifts = q("SELECT id, cerveza, dinero, presente, id_guest FROM gifts")


    # Convertir gifts a diccionario indexado por id_guest
    gifts_dict = {g[4]: g for g in rows_gifts}

    result = []
    for r in rows:
        gift = gifts_dict.get(r[0])  # buscar gifts por id_guest
        if gift:
            result.append({
                "id": r[0],
                "name": r[1],
                "table_number": r[2],
                "side": r[3],
                "obsequio": r[4],
                "gift_id": gift[0],
                "cerveza": gift[1],
                "dinero": gift[2],
                "presente": gift[3],
                "id_guest": gift[4]
            })
        else:
            # si no tiene regalo, igual lo devuelves con None en esos campos
            result.append({
                "id": r[0],
                "name": r[1],
                "table_number": r[2],
                "side": r[3],
                "obsequio": r[4],
                "gift_id": None,
                "cerveza": None,
                "dinero": None,
                "presente": None,
                "id_guest": r[0]
            })
    return jsonify(result)
#    return jsonify([{"id": r[0], "name": r[1], "table_number": r[2], "side": r[3], "obsequio": r[4]} for r in rows])


@app.post('/api/guests')
def create_guest():
    d = request.get_json() or {}
    ultimo_id_guest = qi(f"INSERT INTO guests(name,table_number,side, obsequio) VALUES('{d.get('name','')}', {d.get('table_number',0)}, '{d.get('side','')}','{d.get('obsequio','')}')")
    print("ultimo_id_guest")
    print(ultimo_id_guest)
    q(f"INSERT INTO gifts(cerveza,dinero,presente, id_guest) VALUES('{d.get('cerveza','')}', {d.get('dinero',0)}, '{d.get('presente','')}','{ultimo_id_guest}')")
    return jsonify({"ok": True})


@app.put('/api/guests/<gid>')
def update_guest(gid):
    d = request.get_json() or {}
    print(gid)
    print(d)
    print(d.get('cerveza',0))
    q(f"UPDATE guests SET name='{d.get('name','')}', table_number={d.get('table_number',0)}, side='{d.get('side','')}', obsequio='{d.get('obsequio','')}' WHERE id={gid};")

    updates = []

    if d.get("cerveza") is not None:
        updates.append(f"cerveza='{d['cerveza']}'")
    if d.get("dinero") is not None:
        updates.append(f"dinero={d['dinero']}")
    if d.get("presente") is not None:
        updates.append(f"presente='{d['presente']}'")
    if d.get("id_guest") is not None:
        updates.append(f"id_guest={d['id_guest']}")

    # Si no hay campos para actualizar, no ejecutes nada
    if not updates:
        return None  

    # Unir campos dinámicamente con comas
    query = f"UPDATE gifts SET {', '.join(updates)} WHERE id_guest={gid};"

    print("QUERY:", query)  # Solo para debug
    q(query)  # Ejecuta tu función q() 

    return jsonify({"ok": True})


@app.delete('/api/guests/<gid>')
def delete_guest(gid):
    q(f"DELETE FROM guests WHERE id={gid}")
    return jsonify({"ok": True})


if __name__ == '__main__':
    app.run(debug=True) # ❌ debug on




















#from flask import Flask, request, jsonify
#import sqlite3
#from flask_cors import CORS
#
#app = Flask(__name__)
#CORS(app)  # CORS abierto completamente (inseguro)
#
#conn = sqlite3.connect('db.sqlite', check_same_thread=False)
#conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)')
#
#@app.route('/login', methods=['POST'])
#def login():
#    data = request.get_json()
#    username = data['username']
#    password = data['password']
#
#    # INYECCIÓN SQL (no usar parámetros)
#    cursor = conn.execute(f"SELECT * FROM users WHERE username='{username}' AND password='{password}'")
#    user = cursor.fetchone()
#
#    if user:
#        return jsonify({"message": "Login successful!"})
#    else:
#        return jsonify({"message": "Invalid credentials"}), 401
#
#@app.route('/register', methods=['POST'])
#def register():
#    data = request.get_json()
#    username = data['username']
#    password = data['password']  # Contraseña almacenada en texto plano
#
#    conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
#    conn.commit()
#    return jsonify({"message": "User registered successfully!"})
#
#if __name__ == '__main__':
#    app.run(debug=True)
