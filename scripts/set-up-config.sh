sheet="10UsKKnBgYAXx-nu_gR4kIIEdUtNHSYlhaabJlcMwu4E" #the google sheet to read from

echo "----------------------------------------------------------------------------------------------"
echo "Welcome! This script sets up the config.json file for the Discord bot."
echo "To get any of the IDs necessary for the bot to run, enable Discord Developer Mode in your Discord settings,"
echo "and then right click the server or channel that you want the ID of and click \"Copy ID\"."
echo "----------------------------------------------------------------------------------------------"
echo "Note: To paste into a terminal, you can often use the shortcut Ctrl+Shift+V."
echo "We will now start setting up the config.json file. Press Ctrl+C to quit at any time."
echo ""
read -p "Please enter the Discord server's ID: " serverID
read -p "Please enter the Daily Question channel's ID: " dqChID
read -p "Please enter the Michael Monday channel's ID: " mmChID

echo "Printing to file..."

rm -f config.json #if config.json already exists, delete it
printf "{\n" >> config.json
printf "\t\"guild\": \"$serverID\",\n" >> config.json
printf "\t\"channels\": {\n\t\t\"daily-question-channel\": \"$dqChID\",\n" >> config.json
printf "\t\t\"michael-monday-channel\": \"$mmChID\"\n" >> config.json
printf "\t},\n" >> config.json
printf "\t\"sheet\": {\n" >> config.json
printf "\t\t\"id\": \"$sheet\"\n" >> config.json
printf "\t},\n" >> config.json
printf "\t\"qotd\": {\n" >> config.json
printf "\t\t\"rowIndex\": 0,\n" >> config.json
printf "\t\t\"lastThread\": \"\",\n\t\t\"day\": \"*\",\n\t\t\"hour\": \"10\",\n" >> config.json
printf "\t\t\"minute\": \"0\",\n\t\t\"second\": \"0\",\n\t\t\"archives\": true,\n\t\t\"locks\": true\n\t}\n}" >> config.json

echo "Done!"
