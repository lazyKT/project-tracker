import axios from "axios";


export async function fetchAllProjects (signal) {
    try {
        const res = await axios.get("https://wavescan-frontend-assessment.saurabhmudgal.repl.co/",{
            headers: {
                "Content-Type" : "application/json"
            },
            signal
        });

        return { error: false, data : res.data };
    }
    catch (err) {
        return {
            error: true,
            message: err?.message ? err?.message : "Unexpected Error"
        }
    }
}
