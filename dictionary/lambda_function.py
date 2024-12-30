import json
from nltk.corpus import words

MIN_WORD_LENGTH = 5
DICTIONARY = set(words.words())

def check_ab_word(word):
    is_ab_word = len(word) >= MIN_WORD_LENGTH and word in DICTIONARY

    return is_ab_word

def check_ab_prefix(prefix):
    matching_words = [word for word in DICTIONARY if word.startswith(prefix) and len(prefix) >= MIN_WORD_LENGTH]
    is_ab_prefix = len(matching_words) > 0

    return { "is_ab_prefix": is_ab_prefix, "matching_words": matching_words or None }

def handler(event, context):
    word = event.get('word')
    is_ab_word = check_ab_word(word)
    ab_prefix = check_ab_prefix(word)
    matching_words = ab_prefix['matching_words']
    is_ab_prefix = ab_prefix['is_ab_prefix']
    response = { "word": word, "is_ab_word": is_ab_word, "is_ab_prefix": is_ab_prefix, "matching_words": matching_words, "num_matching_words": len(matching_words) }

    return response
