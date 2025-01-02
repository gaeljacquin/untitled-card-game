import json
import re

from nltk.corpus import words

DICTIONARY = set(words.words())

def check_ab_word(word):
    process_asterisks = '^' + word.replace('*', '.') + '$'
    pattern = re.compile(process_asterisks)
    matches = [
        entry for entry in DICTIONARY
        if pattern.match(entry)
    ]
    valid = len(matches) > 0
    result = { "valid": valid, "matches": matches or None }

    return result

def check_ab_prefix(prefix):
    process_asterisks = '^' + prefix.replace('*', '.')
    pattern = re.compile(process_asterisks)
    matches = [
        entry for entry in DICTIONARY
        if pattern.match(entry)
    ]
    valid = len(matches) > 0
    result = {"valid": valid, "matches": matches or None}

    return result

def ab_checks(ab_string):
    ab_word_check = check_ab_word(ab_string)
    ab_prefix_check = check_ab_prefix(ab_string)
    response = {
        "word": ab_string,
        "ab_word": {
            "valid": ab_word_check['valid'],
            "matches": ab_word_check['matches']
            },
        "ab_prefix": {
            "valid": ab_prefix_check['valid'],
            "matches": ab_prefix_check['matches']
            },
        }

    return response

def handler(event, context):
    word = event.get('word')
    response = ab_checks(word)
    print(response)

    return response
