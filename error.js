process.on('uncaughtException', function(err) {
    console.log(err)
})

process.on('unhandledRejection', function(err) {
    console.log(err)
})