import sys


def insert_navigation(document):
    nav_begin = "<!-- Navigacija -->"
    nav_end = "<!-- Konec navigacije -->"
    with open(document, "r", encoding="utf-8") as f:
        content = f.read()

    zacetek = content.find(nav_begin) + len(nav_begin)
    konec = content.find(nav_end)

    if zacetek == -1 or konec == -1:
        return None

    nav_line = content[:zacetek].split('\n')[-1]
    spaces = (nav_line[:nav_line.find(nav_begin)].count(" "))

    with open(".nav.html", "r", encoding="utf-8") as f:
        nav = f.read()

    nav = nav.split("\n")
    ins = []
    for i in range(1, len(nav)-1):
        ins.append(" " * spaces + nav[i])
    ins = "\n" + "\n".join(ins) + "\n" + spaces * " "
    new_content = content[:zacetek] + ins + content[konec:]

    with open(document, "w+", encoding="utf-8") as f:
        f.write(new_content)


if len(sys.argv) > 1:
    insert_navigation(sys.argv[1])
else:
    path = "Spletna_stran\\"
    files = ["Prikazi\\Kocka-Teserakt-\\index.html",
             "Prikazi\\Oktaeder-in-naprej\\index.html",
             "Prikazi\\Simpleks\\index.html",
             #"Prikazi\\Teserakt\\index.html",
             "Prikazi\\Liki\\index.html",
             "Prikazi\\Ikozaeder\\index.html",
             "Prikazi\\Dodekaeder\\index.html",
             "Prikazi\\600-cell\\index.html",
             "Teorija\\Kompleksna_stevila\\index.html",
             ]
    for file in files:
        try:
            insert_navigation(path + file)
        except:
            print(f"Failed to insert navigation in {file}.")

input("Press Enter to continue.")