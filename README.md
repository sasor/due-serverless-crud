## Steps 1ra vez (yano serian necesarios s clonas el repo)

### Step 1
Instalar el framework
```shell
npm init -y
npm i serverless
npx serverless -- seguir los pasos del comando
```

### Step 2
Tener configurado el usuario IAM con los permisos necesarios o y ejecutar lo sgte
```shell
npx sls config credentials --provider aws --key "XXXXXX" --secret "XXXXXXX" --profile "XXXXX" -- en el *.yml colocar el valor del profile
```

### Ejecutar el deploy completo
```shell
npm run deploy
```

### Ejecutar el deploy de una funcion
[Eejecutar scripts del package.json con parametros](https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script)
```shell
npm run deployf -- [function-name]
```

### Endpoints

Health check (/)
```shell
curl -X GET -i --url https://[insert your url here]/
```

Crear usuario (/users)
```shell
curl -X POST -i --url https://[insert your url here]/ -d '{"name":"Clark Kent","email":"superman@mail.com"}'
```

Actualizar un usuario (/users/{id})
```shell
curl -X PUT -i --url https://[insert your url here]/ -d '{"name":"Clark Kent","email":"superman@mail.com"}'
```

Listar usuarios (/users)
```shell
curl -X GET -i --url https://[insert your url here]/
```

Ver un usuario (/users/{id})
```shell
curl -X GET -i --url https://[insert your url here]/
```

Eliminar un usuario (/users/{id})
```shell
curl -X DELETE -i --url https://[insert your url here]/
```

#### ULID package
[Ref](https://blog.tericcabrel.com/discover-ulid-the-sortable-version-of-uuid/)
[Ref NPM](https://www.npmjs.com/package/ulid)
