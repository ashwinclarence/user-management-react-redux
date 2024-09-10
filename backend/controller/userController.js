export const userLoginRender = async (req,res) => {
    try {
        res.json({message:"this is from controller"})
        
    } catch (error) {
        console.log(`Error on login page render`);
        
    }
}