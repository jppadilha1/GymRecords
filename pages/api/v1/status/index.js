function status(request, response) {
  response.status(200).json({
    teste:
      "retorno do meu endpoint, futuramente colocarei a saúde da aplicação",
  });
}

export default status;
