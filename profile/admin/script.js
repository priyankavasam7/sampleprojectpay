 src="https://www.gstatic.com/firebasejs/7.17.1/firebase.js"
 src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"
 src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"
 src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"
 src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"
 src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"


        var aname = document.getElementById("name")
        var Eid = document.getElementById("eid")
        var phone = document.getElementById("number")
        var department = document.getElementById("dep")
        var gender = document.getElementById("gender")


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
        const fire = firebase.firestore();

        var uuid = localStorage.getItem('currentUser')

        function updateADProfile() {
            fire.collection("ADProfile").doc(uuid).set({

                Category: "Admin",
                Adname: aname.value,
                Eyear: Eid.value,
                Phone: phone.value,
                Department: department.value,
                Gender: gender.value
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }

        var docUrl, imgUrl, brocUrl, decUrl, idUrl;
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

                    firebase.database().ref('ADFiles/ProfilePics/' + uuid).set({
                        profilePic: imgUrl
                    });
                    alert("image uploaded successfully")
                    const image = document.querySelector("#image")
                    image.src = url;
                })
                .catch(console.error);
        }

        function uploadImage2() {
            const ref = firebase.storage().ref();
            const idcardRef = ref.child('idcard');
            const file = document.querySelector("#idcard").files[0];
            const name = +new Date() + "-" + file.name;
            console.log(uuid)
            const metadata = {
                contentType: file.type
            };
            const task = idcardRef.child(uuid).put(file, metadata);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    idUrl = url;

                    firebase.database().ref('ADFiles/ProfilePics/' + uuid).set({
                        IDCard: idUrl
                    });
                    alert("image uploaded successfully")
                    const image = document.querySelector("#image")
                    image.src = url;
                })
                .catch(console.error);
        }

        function uploadFile() {
            const ref = firebase.storage().ref();
            const file1Ref = ref.child('Docproof');
            const file2Ref = ref.child('Decform');
            const file1 = document.querySelector("#doc").files[0];
            const file2 = document.querySelector("#declare").files[0];
            const name1 = +new Date() + "-" + file1.name;
            console.log(uuid)
            const metadata1 = {
                contentType: file1.type
            };
            const task = file1Ref.child(uuid).put(file1, metadata1);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    docUrl = url;

                    firebase.database().ref('ADFiles/Document Proofs/' + uuid).set({
                        docProof: docUrl
                    });
                })
                .catch(console.error);

            const name2 = +new Date() + "-" + file2.name;
            const metadata2 = {
                contentType: file2.type
            };
            const task1 = file2Ref.child(uuid).put(file2, metadata2);
            task1
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(function (url) {
                    decUrl = url;

                    firebase.database().ref('ADFiles/Declaration Forms/' + uuid).set({
                        decForm: decUrl
                    });

                    alert("files uploaded successfully")
                })
                .catch(console.error);

        }

        function retrieveImage() {

            firebase.database().ref('ADProfilePics/' + uuid).on('value', function (snapshot) {
                document.getElementById('image').src = snapshot.val().profilePic;
            });
        }

    // </script>