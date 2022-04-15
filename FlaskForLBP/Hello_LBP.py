# coding:utf-8
from flask import Flask, g
from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from werkzeug.utils import secure_filename
import os
from os.path import join, dirname, realpath
import math
import time

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

@app.route('/')
def hello_world():
    return 'Hello, World!'

# @app.route('/uploads', methods=['POST', 'GET'])
# def uploads():
#     return "uploads/"


@app.route('/upload', methods=['POST', 'GET'])
@app.route('/uploadLBP', methods=['POST', 'GET'])


    # def upload():
#     import uuid
#     import xlsxwriter  # 导入模块
#     newfilename = str(uuid.uuid1())
#     if request.method == 'POST':
#         f = request.files['file']
#         basepath = os.path.dirname(__file__)
#         filename = secure_filename(f.filename)
#         upload_path = os.path.join(basepath,  'uploads', secure_filename(f.filename))
#         print(upload_path)
#         if filename.split(".")[1].lower()=="png" or filename.split(".")[1].lower()=="jpg":
#
#             f.save(upload_path)
#             session["filename"] = newfilename
#             session["extName"]=filename.split(".")[1]
#             import PIL.Image as Image
#
#             infile = os.path.join(basepath,  'uploads', secure_filename(f.filename))
#             outfile = os.path.join(basepath,  'static/') +newfilename+"."+ filename.split(".")[1]
#             print(outfile)
#             im = Image.open(infile)
#             (x, y) = im.size  # read image size
#             x_s = 200  # define standard width
#             y_s = 200  # y * x_s / x  # calc height based on standard width
#             out = im.resize((x_s, y_s), Image.ANTIALIAS)  # resize image with high-quality
#             out.save(outfile)
#
#
#             print(newfilename)
#             workbook = xlsxwriter.Workbook(os.path.join(basepath,  'static/') + newfilename + '.xlsx')  # 新建excel表
#             worksheet = workbook.add_worksheet('sheet1')  # 新建sheet（sheet的名称为"sheet1"）
#             worksheet.set_column('A:XFD', 2)  # 设置所有列宽为2
#
#             cell_format = workbook.add_format()
#             cell_format.set_bg_color('red')
#
#             from PIL import Image
#             import numpy as np
#
#             image = Image.open(outfile)
#             # print(np.array(image))
#             tempTxt=""
#             imageArray = []
#             HArray=[]
#             SArray=[]
#             VArray=[]
#             for i, I in enumerate(np.array(image)):
#                 tempRow = []
#                 for j, J in enumerate(I):
#                     tempRow.append(765 - sum(J))
#                     H,S,V=rgb2hsv(J[0],J[1],J[2])
#                     HArray.append(int(H/3.6))
#                     SArray.append(int(S*100))
#                     VArray.append(int(V*100))
#                 imageArray.append(tempRow)
#
#             #print(imageArray)
#
#             for i, I in enumerate(imageArray):
#                 for j, J in enumerate(I):
#                     worksheet.write(i, j, imageArray[i][j])
#                     tempTxt = tempTxt + str(imageArray[i][j]) +"\n"
#             workbook.close()
#             txtFileName=os.path.join(basepath,  'static/') + newfilename+".txt"
#             f = open(txtFileName,'w')
#             f.write(tempTxt)
#             f.close()
#             print(HArray)
#
#
#             tempTxt = ""
#             for i, I in enumerate(HArray):
#                 tempTxt = tempTxt + str(I) +"\n"
#             txtFileName=os.path.join(basepath,  'static/') + newfilename+"_H.txt"
#             f = open(txtFileName,'w')
#             f.write(tempTxt)
#             f.close()
#
#
#             tempTxt = ""
#             for i, I in enumerate(SArray):
#                 tempTxt = tempTxt + str(I) +"\n"
#             txtFileName=os.path.join(basepath,  'static/') + newfilename+"_S.txt"
#             f = open(txtFileName,'w')
#             f.write(tempTxt)
#             f.close()
#
#             tempTxt = ""
#             for i, I in enumerate(VArray):
#                     tempTxt = tempTxt + str(I) +"\n"
#             txtFileName=os.path.join(basepath,  'static/') + newfilename+"_V.txt"
#             f = open(txtFileName,'w')
#             f.write(tempTxt)
#             f.close()
#             return redirect(url_for('upload'))
#     return render_template('upload.html')

def uploadLBP():
    def saveTextFile(fileName, image):
        import numpy as np
        tempTxt = ""
        imageArray = []
        imageArray = np.array(image)
        for i, I in enumerate(imageArray):
            for j, J in enumerate(I):
                tempTxt = tempTxt + str(int(sum(imageArray[i][j])/7.65)) + "\n"
        txtFileName = os.path.join(basepath, 'static/') + fileName + ".txt"
        f = open(txtFileName, 'w')
        f.write(tempTxt)
        f.close()

    print("this is lbp")
    import uuid
    import xlsxwriter  # 导入模块
    newfilename = str(uuid.uuid1())
    if request.method == 'POST':
        print("this is upload")
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
            import PIL.ImageEnhance as ImageEnhance
            infile = os.path.join(basepath,  'uploads', secure_filename(f.filename))
            outfile = os.path.join(basepath,  'static/') +newfilename+"."+ filename.split(".")[1]
            outfileB = os.path.join(basepath, 'static/') + newfilename + "B." + filename.split(".")[1]
            outfileD = os.path.join(basepath, 'static/') + newfilename + "D." + filename.split(".")[1]
            outfileT4 = os.path.join(basepath, 'static/') + newfilename + "T4." + filename.split(".")[1]
            #print(outfile)
            im = Image.open(infile)


            (x, y) = im.size  # read image size
            x_s = 200  # define standard width
            y_s = 200  # y * x_s / x  # calc height based on standard width
            out = im.resize((x_s, y_s), Image.ANTIALIAS)  # resize image with high-quality

            en = ImageEnhance.Brightness(out)
            imDefault=out
            imBright = en.enhance(1.8)
            imDark = en.enhance(0.6)
            imDeep=en.enhance(0.2)

            out.save(outfile)
            imBright.save(outfileB)
            imDark.save(outfileD)


            #拼多宫格图片
            IMAGES_FORMAT = ['.png', '.PNG', '.jpg', ".JPG"]  # 图片格式
            # 获取图片集地址下的所有图片名称
            #image_names = [name for name in os.listdir(imgDir) for item in IMAGES_FORMAT if os.path.splitext(name)[1] == item]
            # 定义图像拼接函数
            to_image = Image.new('RGB', (200, 200))  # 创建一个新图
            # 循环遍历，把每张图片按顺序粘贴到对应位置上
            from_image = None
            from_image = imDeep.resize((100, 100), Image.ANTIALIAS)
            to_image.paste(from_image, (0, 0))
            from_image = imDark.resize((100, 100), Image.ANTIALIAS)
            to_image.paste(from_image, (100, 0))
            from_image = imDefault.resize((100, 100), Image.ANTIALIAS)
            to_image.paste(from_image, (0, 100))
            from_image = imBright.resize((100, 100), Image.ANTIALIAS)
            to_image.paste(from_image, (100, 100))
            to_image.save(outfileT4)
            saveTextFile(newfilename + "T4",to_image)
            saveTextFile(newfilename + "B", imBright)
            saveTextFile(newfilename + "D", imDark)
            saveTextFile(newfilename + "f", out)






            return redirect(url_for('uploadLBP'))
    return render_template('uploadLBP.html')



if __name__=="__main__":
    app.run(host="0.0.0.0", port=5050,debug=True)