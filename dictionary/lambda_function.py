import json
from itertools import permutations

# Global variable to store dictionary - loaded once per container
DICTIONARY = None

def load_dictionary():
    global DICTIONARY
    if DICTIONARY is None:
        with open('dictionary.json', 'r') as file:
            data = json.load(file)
        DICTIONARY = set(data.keys())  # Using set for O(1) lookups

def ab_check(word_map):
    result = {}
    found_valid_count = 0

    for key in word_map:
        try:
            current = word_map[key]
            word = str(current.get('word', '')).lower()

            result[key] = {
                'word': word,
                'points': current.get('points', 0),
                'label': current.get('label', ''),
                'valid': False,
                'match': '',
                'points_final': 0
            }

            # Check exact match first - faster than permutations
            if word in DICTIONARY:
                result[key].update({
                    'valid': True,
                    'match': word,
                    'points_final': result[key]['points'] + 100
                })
                found_valid_count += 1
                continue

            # Only generate permutations if needed
            found_perm = next((perm_word for perm_word in
                             (''.join(p) for p in permutations(word))
                             if perm_word in DICTIONARY), '')

            if found_perm:
                found_valid_count += 1
                result[key].update({
                    'valid': True,
                    'match': found_perm,
                    'points_final': result[key]['points'] + 100
                })

        except Exception as e:
            result[key] = {
                'error': str(e),
                'valid': False,
                'match': '',
                'points_final': 0
            }

    if 'special' in result:
        result['special']['points_final'] *= 2 if found_valid_count >= 3 else 0

    return result

def handler(event, context):
    try:
        # Load dictionary if not already loaded
        if DICTIONARY is None:
            load_dictionary()

        # Parse payload
        payload = (json.loads(event['body'])
                  if isinstance(event.get('body'), str)
                  else event.get('body', event))

        # Simplified word map creation
        word_map = {
            str(k): {
                'word': str(v.get('word', '')),
                'points': v.get('points', 0),
                'label': v.get('label', '')
            }
            for k, v in payload.items()
        }

        result = ab_check(word_map)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
