curl -X POST \
  -H "X-Parse-Application-Id: APP_ID" \
  -H "X-Parse-REST-API-Key: REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  https://parseapi.back4app.com/classes/GameScore
