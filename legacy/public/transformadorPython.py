import json
import xlrd

print("Transformador Excel - JSON\n\n")
print("Para comenzar siga los siguientes pasos:\n")
print("1. Ejecute el script en la misma ubicación donde se encuentra el documento excel a convertir")
print("2. Nombre al documento de excel con el nombre \"grafo\" la extensión .xlsx se añade automáticamente")
print("3. Recuerde que este script solamente funciona con matrices cuadradas simétricas")
print("4. Cada \"momento\" debe estar en una hoja diferente dentro del mismo archivo")
print("5. Cada matriz debe ser colocada en la celda A1")
print()
columnas = int(input("Indique la cantidad de columnas/filas que tiene su matriz: "))
hojas = int(input("Indique la cantidad de momentos a transformar: "))

try:
    data = xlrd.open_workbook("grafo.xlsx")
except:
    print("No se ha encontrado el archivo excel especificado. Favor de verificar que se encuentra en la ruta actual")
    exit()

try:
    coordinates = open("coordinates.json", "r")

    cDict = json.loads(coordinates.read())

    coordinates.close()
except:
    print("Archivo JSON de coordenadas no encontrado, favor de descargarlo y ponerlo en el directorio actual")
    exit()

jDict = {}

for hoja in range(hojas):
    sheet = data.sheet_by_index(hoja)

    margin = 0

    nodes = []
    for i in range(columnas):
        nodes.append(sheet.cell_value(1+i,0).upper())

    jDict[hoja+1] = {}
    jDict[hoja+1]["nodes"] = [{"id": x, "name": x} for x in nodes]

    for i in jDict[hoja+1]["nodes"]:
        i["fx"] = cDict[i["name"]]["fx"]
        i["fy"] = cDict[i["name"]]["fy"]
        i["fz"] = cDict[i["name"]]["fz"]
        

    jDict[hoja+1]["links"] = []

    for i in range(columnas-1):
        column = 1 + i
        for j in range(columnas-1):
            row = 2 + j + margin
            if(row < 1 + columnas):
                if(sheet.cell_value(row, column) != 0):
                    cellData = sheet.cell_value(row, column)
                    jDict[hoja+1]["links"].append({"target": sheet.cell_value(0, column).upper(), "source": sheet.cell_value(row, 0).upper(), "width": cellData})
    
        margin += 1

with open("grafoConvertido.json", "w") as outfile:
    json.dump(jDict, outfile)

