# coding:utf-8
from flask import Flask, g
from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from werkzeug.utils import secure_filename
import os
from os.path import join, dirname, realpath
import math
import time

#彩色Excel文件和Excel文件

app = Flask(__name__)
app.config['SECRET_KEY'] = '123456'



UPLOAD_PATH = os.path.join(os.path.dirname(__file__),'uploads')

@app.route('/uploads/<filename>/')
def get_image(filename):
	return send_from_directory(UPLOAD_PATH,filename)


def hsv2rgb(h, s, v):
    h = float(h)
    s = float(s)
    v = float(v)
    h60 = h / 60.0
    h60f = math.floor(h60)
    hi = int(h60f) % 6
    f = h60 - h60f
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    r, g, b = 0, 0, 0
    if hi == 0: r, g, b = v, t, p
    elif hi == 1: r, g, b = q, v, p
    elif hi == 2: r, g, b = p, v, t
    elif hi == 3: r, g, b = p, q, v
    elif hi == 4: r, g, b = t, p, v
    elif hi == 5: r, g, b = v, p, q
    r, g, b = int(r * 255), int(g * 255), int(b * 255)
    return r, g, b

def rgb2hsv(r, g, b):
    r, g, b = r/255.0, g/255.0, b/255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx-mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g-b)/df) + 360) % 360
    elif mx == g:
        h = (60 * ((b-r)/df) + 120) % 360
    elif mx == b:
        h = (60 * ((r-g)/df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = df/mx
    v = mx
    return h, s, v
def img2ExcelColor(img,Excel):
    # 读取图片，转为excel
    import xlsxwriter  # 导入模块
    workbook = xlsxwriter.Workbook(Excel)  # 新建excel表
    worksheet = workbook.add_worksheet('sheet1')  # 新建sheet（sheet的名称为"sheet1"）
    worksheet.set_column('A:XFD', 2)  # 设置所有列宽为2
    worksheet.set_zoom(10)
    cell_format = workbook.add_format()

    from PIL import Image
    import numpy as np

    image = Image.open(img)
    # print(np.array(image))

    imageArray = []
    for i, I in enumerate(np.array(image)):
        tempRow = []
        for j, J in enumerate(I):
            tempRow.append("#{:0>2s}{:0>2s}{:0>2s}".format(hex(J[0])[2:], hex(J[1])[2:], hex(J[2])[2:]))
        imageArray.append(tempRow)

    # print(imageArray)

    for i, I in enumerate(imageArray):
        for j, J in enumerate(I):
            cell_format = workbook.add_format()
            cell_format.set_fg_color(J)
            worksheet.write(i, j, '', cell_format)

    workbook.close()
def img2ExcelBlack(img,Excel):
    import xlsxwriter  # 导入模块
    workbook = xlsxwriter.Workbook(Excel)  # 新建excel表
    worksheet = workbook.add_worksheet('sheet1')  # 新建sheet（sheet的名称为"sheet1"）
    worksheet.set_column('A:XFD', 2)  # 设置所有列宽为2

    cell_format = workbook.add_format()
    cell_format.set_bg_color('red')

    from PIL import Image
    import numpy as np

    image = Image.open(img)

    imageArray = []

    for i, I in enumerate(np.array(image)):
        tempRow = []
        for j, J in enumerate(I):
            tempRow.append(765 - sum(J))
        imageArray.append(tempRow)

    for i, I in enumerate(imageArray):
        for j, J in enumerate(I):
            worksheet.write(i, j, imageArray[i][j])
    workbook.close()


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/uploads', methods=['POST', 'GET'])
def uploads():
    return "uploads/"


@app.route('/upload', methods=['POST', 'GET'])

def upload():
    import uuid
    import xlsxwriter  # 导入模块
    newfilename = str(uuid.uuid1())
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__)
        filename = secure_filename(f.filename)
        upload_path = os.path.join(basepath,  'uploads', secure_filename(f.filename))
        print(upload_path)
        if filename.split(".")[1].lower()=="png" or filename.split(".")[1].lower()=="jpg":

            f.save(upload_path)
            session["filename"] = newfilename
            session["extName"]=filename.split(".")[1]
            import PIL.Image as Image

            infile = os.path.join(basepath,  'uploads', secure_filename(f.filename))
            outfile = os.path.join(basepath,  'static/') +newfilename+"."+ filename.split(".")[1]
            print(outfile)
            im = Image.open(infile)
            (x, y) = im.size  # read image size
            x_s = 200  # define standard width
            y_s = 200  # y * x_s / x  # calc height based on standard width
            out = im.resize((x_s, y_s), Image.ANTIALIAS)  # resize image with high-quality
            out.save(outfile)

            img2ExcelColor(outfile,os.path.join(basepath,  'static/') + newfilename + '_c.xlsx')
            img2ExcelBlack(outfile,os.path.join(basepath,  'static/') + newfilename + '_b.xlsx')

            print(newfilename)

            return redirect(url_for('upload'))
    return render_template('upload.html')


if __name__=="__main__":
    app.run(host="0.0.0.0", port=5050,debug=True)