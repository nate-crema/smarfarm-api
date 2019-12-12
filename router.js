module.exports = function(app, fs, path, crypto, axios, mysql_cmf, getIP, async, hash_code, async) {


    function encrypt(pw) {
        let enc_pw;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log(text);
        crypto.pbkdf2(pw, text, 100000, 64, 'sha512', (err, res_enc) => {
            // if (err) throw err;
            enc_pw = res_enc.toString('hex');
        });
        return{res_pw: enc_pw, salt: text};
    }




    // Create

    app.post('/user', function(req, res) {
        console.log(req.body);
        const userid = req.body.userid;
        const pw = req.body.pw;
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const birth = req.body.birth;
        let enc_pw;
        let salt_out;


        // exist check

        mysql_cmf("SELECT * FROM user WHERE userid LIKE '" + userid + "'")
        .then((res_sql) => {
            // console.log(res_sql.length == []);
            if (res_sql.length != 0) {
                // exist id
                res.end("Already using userid: " + userid);
            } else {
                // pw encrypt
                var salt = "";
                var possible = "0123456789";

                for( var i=0; i < 10; i++ )
                    salt += possible.charAt(Math.floor(Math.random() * possible.length));

                console.log(salt);

                salt_out = salt;
                
                
                try {
                    crypto.pbkdf2(pw, salt, 100000, 64, 'sha512', (err, res_enc) => {
                        console.log(res_enc.toString('hex'));
                        enc_pw = res_enc.toString('hex');
                        // res.end(res_enc.toString('hex'));
                    })
                } catch (e) {
                    console.error(e);
                }
            }
        })


        mysql_cmf(`insert into user (userid, password, pwsalt, name, email, phone, birth) values (` + userid + `, ` + enc_pw + `, ` + salt_out + `, ` + name + `, ` + email + `, ` + phone + `, ` + birth + `)`)
        .then((res_sql) => {
            console.log(res_sql);
            res.end("complete");
        })
        .catch((e) => {
            console.log("sfrdgtfh");
            throw e;
        })
    });


    // Update



    // Read

    app.get('/user', function(req, res) {
        const sType = req.body.sType;
        const pw = req.body.pw;

        let sobj;
        if (sType == "id") {
            sobj = req.body.id;
        } else if (sType == "userid") {
            sobj = req.body.userid;
        } else if (sType == "name") {
            sobj = req.body.name;
        } else if (sType == "email") {
            sobj = req.body.email;
        } else if (sType == "unum") {
            sobj = req.body.unum;
        } else if (sType == "phone") {
            sobj = req.body.phone
        }
        
        mysql_cmf("SELECT * FROM user WHERE " + sType + " LIKE '" + sobj + "'")
        .then((res_sql) => {
            console.log(res_sql);
            res.json(res_sql);
        });
    });



    // Delete






}