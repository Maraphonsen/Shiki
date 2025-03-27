import './Footer.css'


function Footer() {

    return (
        <>
			<footer>
				<div className="container">
					<div className="logo">
						<img src="/shiki-logo.png" alt="Marvel Logo" />
					</div>
                    <p className='policy'>Data provided by Shikimori ©2025 Shikimori</p>
                    <a className='devLink' href="https://shikimori.one/" target="_blank" rel="noopener noreferrer">developer.shikimori.one</a>
				</div>
			</footer>
		</>
	)

}
export default Footer;