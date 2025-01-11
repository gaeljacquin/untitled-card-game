import json
from itertools import permutations

with open('dictionary.json', 'r') as file:
    data = json.load(file)

dictionary = list(data.keys())

def ab_check(word_map):
    for key in word_map:
        word = word_map[key]['word'].lower()

        if word in dictionary:
            word_map[key]['valid'] = True
            word_map[key]['match'] = word
            word_map[key]['points_final'] = word_map[key]['points'] + 100
            continue

        word_perms = permutations(word)
        found_valid = False
        found_match = ''

        for perm in word_perms:
            perm_word = ''.join(perm)

            if perm_word in dictionary:
                found_valid = True
                found_match = perm_word
                break

        word_map[key]['valid'] = found_valid
        word_map[key]['match'] = found_match
        word_map[key]['points_final'] = word_map[key]['points'] + 100 if found_valid else 0

    return word_map

def handler(event):
    word_map = event

    return ab_check(word_map)
