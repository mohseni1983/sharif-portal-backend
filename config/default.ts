export default {
  database:{
    postgres:{
      database:'sharif',
      username:'postgres',
      password:'admin',
      synchronize:true,
      host:'192.168.88.150',
      port:5432,
      entities:[__dirname+'/../**/**.entity{.ts,.js}'],
  },
    redis:{
      host: '127.0.0.1',
      port: 6379
    }
  }
}
