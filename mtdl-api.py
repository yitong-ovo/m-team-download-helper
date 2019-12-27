from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
download_list = {}

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<secret>/getDownload.xml', methods=['GET'])
def make_download_xml(secret):
    if secret not in download_list:
        download_list[secret] = []

    xml_template = render_template('download.xml', data=download_list[secret])
    xml_template = app.make_response(xml_template)
    xml_template.headers['Content-Type'] = 'text/xml'
    return xml_template

@app.route('/<secret>/addDownload', methods=['POST'])
def addDownload(secret):
    if secret not in download_list:
        download_list[secret] = []

    _title = request.get_json()['title']
    _url = request.get_json()['url']

    download_list[secret].append({'title': _title , 'download': _url})

    return jsonify({'status':0})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
