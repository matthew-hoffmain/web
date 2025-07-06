# TODO: replace this module with cyforge implementation
from openai import OpenAI
from cyforge.blocks.schema import Schema


KEY = "get your own key from https://platform.openai.com/account/api-keys"

def get_response(messages) -> str:
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
    return response.choices[0].message.content
