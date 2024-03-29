import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://localhost:8080/",

  headers: {
    // *****************************************************************************************************************
    // Observação:
    // Se um tipo de conteúdo não for especificado, a solicitação verificará o valor do parâmetro Definir tipo de mídia.
    // Se o valor do parâmetro Set Media Type não for definido, por padrão, para os métodos POST e PUT HTTP, o tipo de 
    // conteúdo application/json será usado. Enquanto para os métodos HTTP GET e DELETE, o tipo de conteúdo 
    // application/x-www-form-urlencoded é usado.
    //  ****************************************************************************************************************
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    // 'Cookie': 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInJvbGVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIl0sImF0aSI6ImI1NWI3ZjFhLWE2M2EtNDQxNy05ZTFmLWJlNDExOTc4ZmNmMiIsIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiaWQiOjEsImV4cCI6MTY0MzEzMjA1OCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXSwianRpIjoiZjkwYTk5NTctODk5MS00Zjc4LTgxM2UtMDA1NjY2YzJhOTA2IiwiZW1haWwiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiY2xpZW50X2lkIjoiYW5ndWxhciIsInVzZXJuYW1lIjoiQWRtaW5pc3RyYWRvciJ9.SiEcVGpFO0cYeh_ujzzWLblwBKDhWEtkJDPF1dHtRQY'
  },
  withCredentials: true,
});

export default instance;
