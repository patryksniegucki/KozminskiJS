# ProjektZaliczeniowyJS
It's project for my study in JS on Kozmin



README będzie po polsku bo polski projekt

To jest repozytorium do projektu ze sklepem sprzedającym auta
Składa się z 3 plików .js
main.js
details.js
buyPage.js
oraz 3 plików .html
main.html
details.html
buyPage.html

main.js oraz main.html
te pliki zajmują się stroną główną na której znajduje się lista pojazdów pobierana z pliku plik.json, dodatkowo przez nią można przejść do szczegółów każdego z pojazdów.
Nie posiadam jeszcze wyszukiwarki, ale dodam to w najbliższym czasie

details.js oraz details.html
jest to strona która wyświetla się po naciśnięciu przycisku szczegółów na stronie głównej
wyświetlają się w niej wszystkie dane pojazdu z plik.json (carPhoto jeszcze nie działa poprawnie ale to poprawie)
W details.js istnieją 3 przyciski:
1. Powrót (służy do powrotu do widoku main.html)
2. Kup (służy do otworzenia strony z zakupem auta oraz zapisania danych na temat auta i dodatków localStorage), aczkolwiek zapisuje na razie tylko cenę, bez nazw dodanych dodatków

Konfigurator: otwiera sekcję w ktorej znajdują się dwa radiobuttony związane z finansowaniem, 3 inputy z imieniem, nazwiskiem i adresem dostawy, które się zapisują w localStorage
oraz tabela dodatków która pozwala dodać odjąc dodatki i składa się z id, nazwy i ceny. Cena jest doliczana do końcowej wartości auta.
Dodatkowo inputy oraz radiobuttony posiadają walidację przejścia jeśli są puste.

Na ostatniej stronie znajduje się podsumowanie zakupu ze wszystkimi danymi z poprzedniej strony. (muszę dodać nazwy dodatków i poprawić walidację dla radiobuttonow)