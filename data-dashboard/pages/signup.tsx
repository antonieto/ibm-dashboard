import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';

const SignUp = () => {
    return (
        <div>
            <div className={utilStyles.navbar}>
                <h2 className={utilStyles.logo}>IBM <b>Insight Hub</b></h2>
            </div>
            <div className={utilStyles.content}>
                <div className={utilStyles.safeArea}>
                    <h1 className={utilStyles.mainHeader}>Iniciar sesión</h1>
                    <p className={utilStyles.instruction}>Ingresa tus datos para iniciar sesión</p>
                    <form className={utilStyles.form}>
                        <div className={utilStyles.inputFields}>
                            <div className={utilStyles.field}>
                                <label className={utilStyles.fieldLabel}>Correo electrónico</label>
                                <input className={utilStyles.textInput} type="email" placeholder="e.g. correo@gmail.com" />
                            </div>
                            <div className={utilStyles.field}>
                                <label className={utilStyles.fieldLabel}>Contraseña</label>
                                <input className={utilStyles.textInput} type="password" placeholder="e.g. S3cureP@ssworD" />
                            </div>
                        </div>
                        <button className={utilStyles.mainButton} >Iniciar sesión</button>
                        <div className={utilStyles.redirect}>
                            <p className={utilStyles.condition}>¿No tienes cuenta?</p><Link href={'/'} className={utilStyles.link} >Crear cuenta</Link>
                        </div>
                    </form>
                </div>
                <Image src="/images/signup.png" alt="Man and Woman" width={333} height={402} className={utilStyles.image}/>
            </div>
        </div>
    );
}

export default SignUp;