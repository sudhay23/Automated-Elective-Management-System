export default async function freezeRoundOne(coursePrefs, studentObj) {
    const prefsIds = coursePrefs.map((course) => course._id);
    // console.log(prefsIds, studentObj);

    // POST to server
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/freeze/roundone`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coursePrefIds: prefsIds,
                studentObj: studentObj,
            }),
        }
    );
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}
