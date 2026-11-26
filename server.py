from flask import send_from_directory, request, Flask, json, Response

from game import Game


# game state is populated here after the game starts
# TODO: game state only in memory, maybe it would be good to save it to disk
game_state = {}

game = Game()

app = Flask(__name__)

@app.route("/new-game/<player>")
def new_game(player):
    game.add_player(player)
    player_game_state = {
        "money": 0,
        "water": 0
    }
    game_state[player] = player_game_state

    return player_game_state

@app.route("/get-game/<player>")
def get_game(player):
    # check if player exists in game state
    # game_state in this example is a dictionary
    # player names are used as keys in the dictionary
    if player not in game_state:

        # error responses should be handled by flask
        response = {
            "message": "Player not found",
            "status": 400
        }
        json_response = json.dumps(response)
        http_response = Response(response=json_response, status=response["status"], mimetype="application/json")
        return http_response


    # game state edits etc should be done in the game.py file, not here in server.py
    return game_state[player]

@app.route("/add-water/<player>")
def add_water(player):
    if player not in game_state:
        response = {
            "message": "Player not found",
            "status": 400
        }
        json_response = json.dumps(response)
        http_response = Response(response=json_response, status=response["status"], mimetype="application/json")
        return http_response

    game_state[player]["water"] += 10

    return game_state[player]

@app.route("/add-money/<player>")
def add_money(player):
    if player not in game_state:
        response = {
            "message": "Player not found",
            "status": 400
        }
        json_response = json.dumps(response)
        http_response = Response(response=json_response, status=response["status"], mimetype="application/json")
        return http_response

    game_state[player]["money"] += 10

    return game_state[player]

@app.route("/images/<path:filename>")
def serve_image(filename):
    return send_from_directory("images", filename)

@app.route("/<path:filename>")
def serve_asset(filename):
    return send_from_directory("static", filename)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, use_reloader=True)
