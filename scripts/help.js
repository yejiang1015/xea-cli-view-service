module.exports = async () => {
	console.log(`
Usage: xea-cli-node-service <command> [options]

Options:
  serve,                          start|build serve
  views                           start|build views

Commands:
  serve                           start views & serve & nw
  serve [Options]                 start views | serve
  build                           build views & serve & nw
  build [options]                 build views | serve | nw

  Run xea-cli-node-service for detailed usage of given command.
`);
};
