module.exports = function(app, fs, path, crypto, axios, mysql_cmf, getIP, async, hash_code) {


    // Create


    // Update



    // Read

    app.post('/user', function(req, res) {
        const id = req.body.id;
        const pw = req.body.pw;
        
        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(pw, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
                const pw_enc = key.toString('base64');
                const salt= buf.toString('base64');
                console.log("salt: " + buf.toString('base64'));
                console.log("key: " + key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
                
                mysql_cmf("SELECT * FROM user WHERE pw LIKE '" + pw_enc + "'")
                .then(function(res_sql) {
                    console.log(res_sql);
                    res.end(res_sql);
                })
            });
        });
        
    })



    // Delete






}