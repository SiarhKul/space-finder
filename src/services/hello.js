exports.main = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify(`Hello! ${process.env.TABLE_NAME}`)
    }
}
