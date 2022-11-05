function badArgs(arg)
{
    if (arg != 'guild')
    {
        if (arg != 'global')
        {
            return true;
        }
    }
    return false;
}

function checkArgs(arg)
{
    if (badArgs(arg))
    {
        errExit();
    }
}

function errExit()
{
    console.error('ERROR: specify either guild or global')
    process.exit(1);
}

module.exports = { checkArgs, badArgs, errExit };