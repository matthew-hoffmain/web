from openai import OpenAI
from cyforge.blocks.schema import Schema


KEY = "temp please get your own"

def get_response(messages, message_id) -> str:
    """
    Get a response from the OpenAI API.
    :param prompt: The prompt to send to the OpenAI API.
    :return: The response from the OpenAI API.
    """
    client = OpenAI(api_key=KEY)
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
    response_audio.stream_to_file(f'static/audio/virgil/test{message_id}.mp3')
    return response_content