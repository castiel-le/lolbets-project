# LoLBets Project
LoLBets is a League of Legends betting website for the casuals and the competitive. It uses virtual currency for betting, so no real money is involved. The application utilizes MERN(M = MySQL) stack along with a standalone java importer tool. This java importer tool is used for reading League of Legends matches dataset, and accessing new matches from [PandaScore](https://pandascore.co/).\
\
The source of dataset used is from  [Oracle's Elixir](https://oracleselixir.com/).
## The Developers
Trevor McCubbin\
Vashti Lanz Rubio\
Castiel Le\
Jackson Kwan\
Marian Ruth Lina
## How to Setup Locally
### Requirements
1. [MySQL](https://www.mysql.com/) database.
2. [Google OAuth](https://developers.google.com/identity/protocols/oauth2) Client ID and Client Secret.
3. [PandaScore](https://pandascore.co/stats) access token (Free tier available).
4. [NodeJS](https://nodejs.org/en/).

### Step 1: Setting up the Google OAuth
1. First, you will need to setup a [Google Cloud Project](https://console.cloud.google.com/home/dashboard?project=carbon-clover-265922).
2. After setting up a project, look at the left navigation bar, then go to `APIs & Services` > `Oauth Consent screen`.
3. After setting up the Oauth consent screen, go the the `Credentials` screen and create a new **OAuth client ID**.
4. When Google asks for authorized origins and a redirect URI, enter: `http://localhost:3001/oauth2/redirect/google`
5. After setting up a new OAuth client ID, copy the `client ID` and `client secret` for the next step.

### Step 2: Setting up the Config Files
1. In the **/server** and root directory, Create `.env`. It must contain the following:
```
PORT=3001
dbURL=<INSERT YOUR DB'S URL. If locally, put "localhost">
dbUsername=<Your db user's username>
dbPassword=<Your db user's password>
GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Your Google OAuth Client Secret>
certificate=<Your db's certificate content. If locally, then it can be empty string>
```
2. In the **/java** directory, create `db.config`. It must contain the following:
```
db.url=<INSERT YOUR DB'S URL. If locally, put "localhost">
db.table=lolbets
db.user=<Your db user's username>
db.pass=<Your db user's password>
```
3. In the **/java** directory, create `pandascore.config`. It must contain the following:
```
token=<Your PandaScore access token>
url.upcoming=api.pandascore.co/lol/matches
url.past=api.pandascore.co/lol/matches/past
url.teams=api.pandascore.co/lol/teams
lcs_id=4198
```
### Step 3: Setting up the Database Tables
1. Within the /sql_scripts directory, you will see two files: `create_db.sql` and `triggers_and_procedures.sql`. These script files are used to create a clean database for this application.
2. Ignore `triggers_and_procedures.sql` for now.
3. Open and run `create_db.sql`. This will create the schema and tables needed in the application.

### Step 4: Populating the Database
1. With an IDE, open **/java** as a java project. Select and run`App.js`(Will have to run it multiple times.) 
2. Run App.js and on the console, type: `1`. (adds teams to db)
3. Run App.js and on the console, type: `5`. (adds matches from 2021)
4. Run App.js and on the console, type: `6`. (adds matches from 2022)
5. Run App.js and on the console, type: `7`. (adds matches from 2020)
6. Run App.js and on the console, type: `8`. (adds matches from 2019)
9. Run App.js and on the console, type: `4`. (removes teams with no match history)

### Step 5: Setting up the Triggers and New Matches
1. In the **/sql_scripts** directory, open and run `triggers_and_procedures.sql`. This will create the procedures, and triggers in the database.
2. Open the `/java` directory as a java project again.
3. Run App.js and on the console, type: `2` (gets new matches from PandaScore to db)\
**This will get new matches and also create bets, thanks to the triggers.**

### Step 6: Building and Running the React and Node Apps
1. On the console, go to `/frontend` directory. Enter the following commands on the console: 
```
npm install
npm run build
``` 
**This will get all the dependencies needed, and create a build folder on the react containing the files needed in order for the `/server` to run the React app.**\
\
2. After the build has finished, go to `/server` on the console and enter the following commands:
```
npm install
cd ..
npm start
```
**This should install all the dependencies on the `/server` directory, and run the app afterwards. After the app is running, open up a web browser and go to `localhost:3001`. Congrats! You have now deployed our LoLBets website locally.**