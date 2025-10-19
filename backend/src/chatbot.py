from openai import OpenAI
from datetime import datetime



def get_response(make, model, key, messages, message_id) -> dict:
    """
    Get a response from the OpenAI API.
    :param prompt: The prompt to send to the OpenAI API.
    :return: Dictionary containing the response content and audio filename.
    """
    client = OpenAI(api_key=key)
    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=messages
    )

    response_content = response.choices[0].message.content
    response_audio = client.audio.speech.create(
        model="tts-1-hd",
        voice="echo",
        input=response_content[:4095],
        response_format='mp3',
        speed=1
    )
    # Generate timestamp in UTC, format YYYYMMDDTHHMMSS
    timestamp = datetime.utcnow().strftime('%Y%m%dT%H%M%S')
    filename = f'static/audio/virgil/{timestamp}.mp3'
    response_audio.write_to_file(filename)

    return {
        'content': response_content,
        'audio_filename': f'{timestamp}.mp3'
    }
