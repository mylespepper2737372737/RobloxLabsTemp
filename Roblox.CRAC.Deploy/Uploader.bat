@echo off
title ROBLOX Uploader 0.0.1
echo Welcome to the ROBLOX uploader!
echo Created by Brent Da Mage
ping localhost -n 2 >nul
:: Allows for color
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)
cls

set url=setup.sitetest4.robloxlabs.com
echo Deploying to %url%
call :PROMPT
cls

::Variables
  set CDNDir=C:\dev\web\sitetest4.robloxlabs.com\Roblox.StaticPages\setup\
  set platform=Win32
  set build=Release
  set build=Release
  set /p uploadType="Enter Upload Type (C,R,B): "
cls

echo Platform: %platform%
echo Build Type: %build%
echo Upload Type: %uploadType%
call :PROMPT

:: Deploy section ::

::Creates switch
2>NUL CALL :DEPLOY_%uploadType%
IF ERRORLEVEL 1 CALL :UNKNOWN_DEPLOY :: Jumps if no deploy method is found
echo Press any key to exit...
PAUSE >nul
EXIT

:DEPLOY_C
  call :ColorText 09 "Deploying client..."
  set typeName=RobloxPlayer
  cd C:\dev\roblox\UploadBits\%platform%-%build%-%typeName%\
  CALL :DEPLOY
  call :ColorText 02 "Finished deploying client!"
  GOTO :EOF
:DEPLOY_R
  call :ColorText 09 "Deploying RCCService..."
  set typeName=RCCService
  CALL :DEPLOY
  call :ColorText 02 "Finished deploying RCCService!"
  GOTO :EOF
:DEPLOY_B
  call :ColorText 09 "Deploying both..."
  CALL :DEPLOY_C
  CALL :DEPLOY_R
  call :ColorText 02 "Finished deploying both!"
  GOTO :EOF
:UNKNOWN_DEPLOY
  call :ColorText 0C "Unknown upload type!"
  GOTO :EOF

:DEPLOY
  cd C:\dev\roblox\UploadBits\%platform%-%build%-%typeName%\
  call :Hash

  SETLOCAL ENABLEDELAYEDEXPANSION
  ::Move the files
  for /f "tokens=*" %%f in ('dir /b *') do (
    ::Hack to prevent multiple prompts during deployment
    >> "%CDNDir%version-%hash%-%%f" rem/
    xcopy /Q /Y /F "%%f" "%CDNDir%version-%hash%-%%f" > nul
	echo Deployed version-%hash%-%%f
  )
  ::Set the version
  echo|set /p="version-%hash%">"%CDNDir%\version"
  GOTO :EOF

:: End deploy section ::

::Functions
  :ColorText
    <nul set /p ".=%DEL%" > "%~2"
    findstr /v /a:%1 /R "^$" "%~2" nul
    del "%~2" > nul 2>&1
	echo.
    goto :eof
  :Hash
    rem // Set ErrorLevel and exit code to a random number:
	cmd /C exit %RANDOM%
	rem // Return the last two digits of the hexadecimal exit code:
	set hash=%=ExitCode:~-2%
	:loop
	cmd /C exit %RANDOM%
	set hash=%hash%%=ExitCode:~-2%
	set /a t=t+1
	if %t% LSS 7 goto loop
	SET hash
	CALL :LoCase hash
    goto :eof
  :PROMPT
    SET /P AREYOUSURE=Is this correct? (Y/[N]): 
	IF /I "%AREYOUSURE%" NEQ "Y" EXIT
	goto :eof
  :LoCase
    :: Subroutine to convert a variable VALUE to all lower case.
    :: The argument for this subroutine is the variable NAME.
    FOR %%i IN ("A=a" "B=b" "C=c" "D=d" "E=e" "F=f" "G=g" "H=h" "I=i" "J=j" "K=k" "L=l" "M=m" "N=n" "O=o" "P=p" "Q=q" "R=r" "S=s" "T=t" "U=u" "V=v" "W=w" "X=x" "Y=y" "Z=z") DO CALL SET "%1=%%%1:%%~i%%"
    GOTO:EOF

  :UpCase
    :: Subroutine to convert a variable VALUE to all UPPER CASE.
    :: The argument for this subroutine is the variable NAME.
    FOR %%i IN ("a=A" "b=B" "c=C" "d=D" "e=E" "f=F" "g=G" "h=H" "i=I" "j=J" "k=K" "l=L" "m=M" "n=N" "o=O" "p=P" "q=Q" "r=R" "s=S" "t=T" "u=U" "v=V" "w=W" "x=X" "y=Y" "z=Z") DO CALL SET "%1=%%%1:%%~i%%"
    GOTO:EOF

  :TCase
    :: Subroutine to convert a variable VALUE to Title Case.
    :: The argument for this subroutine is the variable NAME.
    FOR %%i IN (" a= A" " b= B" " c= C" " d= D" " e= E" " f= F" " g= G" " h= H" " i= I" " j= J" " k= K" " l= L" " m= M" " n= N" " o= O" " p= P" " q= Q" " r= R" " s= S" " t= T" " u= U" " v= V" " w= W" " x= X" " y= Y" " z= Z") DO CALL SET "%1=%%%1:%%~i%%"
    GOTO:EOF