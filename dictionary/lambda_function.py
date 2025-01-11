import json
from itertools import permutations

with open('dictionary.json', 'r') as file:
    data = json.load(file)

dictionary = list(data.keys())

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

            if word in dictionary:
                result[key]['valid'] = True
                result[key]['match'] = word
                result[key]['points_final'] = result[key]['points'] + 100
                continue

            word_perms = permutations(word)
            found_valid = False
            found_match = ''

            for perm in word_perms:
                perm_word = ''.join(perm)
                if perm_word in dictionary:
                    found_valid = True
                    found_match = perm_word
                    found_valid_count += 1
                    break

            result[key]['valid'] = found_valid
            result[key]['match'] = found_match
            result[key]['points_final'] = result[key]['points'] + 100 if found_valid else 0

        except Exception as e:
            result[key] = {
                'error': str(e),
                'valid': False,
                'match': '',
                'points_final': 0
            }

    result['special']['points_final'] *= 2 if found_valid_count >= 3 else 0

    return result


def handler(event, context):
    try:
        # Check if the event comes from API Gateway (will have 'body' field)
        if isinstance(event, dict) and 'body' in event:
            # If body is a string, parse it
            if isinstance(event['body'], str):
                payload = json.loads(event['body'])
            else:
                payload = event['body']
        else:
            # Direct Lambda invocation
            payload = event

        # Create word map from the payload
        word_map = {
            str(key): {
                'word': str(value.get('word', '')),
                'points': value.get('points', 0),
                'label': value.get('label', '')
            }
            for key, value in payload.items()
        }

        result = ab_check(word_map)

        # Return formatted response for API Gateway
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # For CORS support
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
            'body': json.dumps({
                'error': str(e)
            })
        }
