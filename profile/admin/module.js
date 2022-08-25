        type="module"

        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

        const firebaseConfig = {

            apiKey: "AIzaSyCYybtuNQHaMpcKNdTyjK_e0Y0k5xChMQI",

            authDomain: "mgpa-6cc10.firebaseapp.com",

            databaseURL: "https://mgpa-6cc10-default-rtdb.firebaseio.com",

            projectId: "mgpa-6cc10",

            storageBucket: "mgpa-6cc10.appspot.com",

            messagingSenderId: "292918906000",

            appId: "1:292918906000:web:69bf0126437f9ea2abdc15"


        };

        const app = initializeApp(firebaseConfig);

        import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

        const db = getDatabase();

        var aname = document.getElementById("name")
        var eid = document.getElementById("eid")
        var phone = document.getElementById("number")
        var department = document.getElementById("dep")
        var gender = document.getElementById("gender")

        var insBtn = document.getElementById("insBtn")
        var uuid = localStorage.getItem('currentUser')

        function InsertData() {
            set(ref(db, "ADProfile/" + uuid), {

                Category: "Admin",
                Adname: aname.value,
                Eyear: eid.value,
                Phone: phone.value,
                Department: department.value,
                Gender: gender.value
            })
                .then(() => {
                    alert("data stored successfully")
                })
                .catch((error) => {
                    alert("couldn't store the data due to " + error)
                });
        }

        function SelectData() {
            const dbref = ref(db);

            get(child(dbref, "ADProfile/" + uuid)).then((snapshot) => {
                if (snapshot.exists()) {

                    aname.value = snapshot.val().Adname;
                    eid.value = snapshot.val().Eyear;
                    phone.value = snapshot.val().Phone;
                    department.value = snapshot.val().Department;
                    gender.value = snapshot.val().Gender
                }
                else {
                    alert("no data found")
                }
            })
                .catch((error) => {
                    alert(error)
                });
        }

        insBtn.addEventListener('click', InsertData);
    // </script>