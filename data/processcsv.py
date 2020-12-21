import csv, os

dirname = os.path.dirname(__file__)
datafile = os.path.join(dirname, 'HistoricalEsportData.csv')
outfile = os.path.join(dirname, 'parsedData.csv')
generalfile = os.path.join(dirname, 'GeneralEsportData.csv')

games = {}

genres = {}

with open(generalfile) as csv_general:
    csv_gen_reader = csv.reader(csv_general, delimiter=',')
    lc = 0
    for r in csv_gen_reader:
        if lc == 0:
            lc += 1
            continue
        else:
            game = r[0]
            release = r[1]
            genre = r[2]
            genres[game] = (genre, release)

with open(datafile) as csv_file:
    with open(outfile, 'w', newline='') as output_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        output_writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                row[0] = 'Year'
                row.insert(2, 'Genre')
                row.insert(6, 'Release')
                output_writer.writerow(row)
                line_count += 1
            else:
                #print(row)
                game = row[1]
                date = row[0]
                year = date.split('/')[2]
                if year != str(2020):
                    if game not in games.keys():
                        games[game] = {}
                        games[game][year] = row[2:]
                    else:
                        if year not in games[game].keys():
                            games[game][year] = row[2:]
                        else:
                            old = games[game][year]
                            new = [round(float(old[0]) + float(row[2]), 2), int(old[1]) + int(row[3]), int(old[2]) + int(row[4])]
                            games[game][year] = new
                    line_count += 1

        for game in games.keys():
            for year in games[game].keys():
                output_writer.writerow([year, game, genres[game][0]] + games[game][year] + [genres[game][1]])
