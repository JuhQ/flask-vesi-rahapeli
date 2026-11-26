class Game:
    def __init__(self):
        self.players = {}

    def add_player(self, player):
        if player not in self.players:
            self.players[player] = {
                "money": 0,
                "water": 0
            }
            return True
        return False
