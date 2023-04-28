import { useNavigate } from "react-router-dom";

export default function NavController({ path = '..', text = 'Back' }) {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(path)}>
            {text}
        </button>
    )
}