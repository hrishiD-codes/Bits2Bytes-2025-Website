import React from 'react'
import Link from 'next/link'

function Navlink(
    { name, link, setToggle }
) {
    const element = React.useRef(null);

    React.useEffect(() => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;

        element.current.onmouseover = event => {
            let iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");
                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        }
    }, [])

    return (
        <div>
            <Link href={link} ref={element} data-value={name} onClick={() => setToggle && setToggle(true)}>
                {name}
            </Link>
        </div>
    )
}

export default Navlink