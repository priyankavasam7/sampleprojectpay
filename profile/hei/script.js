src="firestore-db.js"
src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"
src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"
src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"
src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"
src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"

        var Config = {

            apiKey: "AIzaSyCYybtuNQHaMpcKNdTyjK_e0Y0k5xChMQI",

            authDomain: "mgpa-6cc10.firebaseapp.com",

            databaseURL: "https://mgpa-6cc10-default-rtdb.firebaseio.com",

            projectId: "mgpa-6cc10",

            storageBucket: "mgpa-6cc10.appspot.com",

            messagingSenderId: "292918906000",

            appId: "1:292918906000:web:69bf0126437f9ea2abdc15"
        };


        // Initialize Firebase

        firebase.initializeApp(Config);
        console.log(firebase);

        var uuid = localStorage.getItem('currentUser')

        var imgName, imgUrl, brocUrl, decUrl;
        var files = [];
        var reader;

        function uploadImage() {
            const ref = firebase.storage().ref();
            const imagesRef = ref.child('profiles');
            const file = document.querySelector("#photo").files[0];
            const name = +new Date() + "-" + file.name;
            console.log(uuid)
            const metadata = {
                contentType: file.type
            };
            const task = imagesRef.child(uuid).put(file, metadata);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    imgUrl = url;

                    firebase.database().ref('HEIFiles/ProfilePics/' + uuid).set({
                        profilePic: imgUrl
                    });
                    alert("image uploaded successfully")
                    const image = document.querySelector("#image")
                    image.src = url;
                })
                .catch(console.error);
        }

        function uploadFile() {
            const ref = firebase.storage().ref();
            const fileRef = ref.child('Brochures');
            const file1 = document.querySelector("#brochure").files[0];
            const file2 = document.querySelector("#dec").files[0];
            const name1 = +new Date() + "-" + file1.name;
            console.log(uuid)
            const metadata1 = {
                contentType: file1.type
            };
            const task = fileRef.child(uuid).put(file1, metadata1);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    brocUrl = url;

                    firebase.database().ref('HEIFiles/Brochures/' + uuid).set({
                        brochure: brocUrl
                    });
                })
                .catch(console.error);

            const name2 = +new Date() + "-" + file2.name;
            const metadata2 = {
                contentType: file2.type
            };
            const task1 = fileRef.child(uuid).put(file2, metadata2);
            task1
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    decUrl = url;

                    firebase.database().ref('HEIFiles/Declaration Forms/' + uuid).set({
                        decForm: decUrl
                    });

                    alert("files uploaded successfully")
                })
                .catch(console.error);

        }

        function retrieveImage() {

            firebase.database().ref('heiProfilePics/' + uuid).on('value', function (snapshot) {
                document.getElementById('image').src = snapshot.val().profilePic;
            });
        }
