@ECHO OFF
title Powered by ����
color 3f
:init
setlocal DisableDelayedExpansion
set "batchPath=%~0"
for %%k in (%0) do set batchName=%%~nk
set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
setlocal EnableDelayedExpansion
:checkPrivileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )
:getPrivileges
if '%1'=='ELEV' (echo ELEV & shift /1 & goto gotPrivileges)
ECHO Set UAC = CreateObject^("Shell.Application"^) > "%vbsGetPrivileges%"
ECHO args = "ELEV " >> "%vbsGetPrivileges%"
ECHO For Each strArg in WScript.Arguments >> "%vbsGetPrivileges%"
ECHO args = args ^& strArg ^& " "  >> "%vbsGetPrivileges%"
ECHO Next >> "%vbsGetPrivileges%"
ECHO UAC.ShellExecute "!batchPath!", args, "", "runas", 1 >> "%vbsGetPrivileges%"
"%SystemRoot%\System32\WScript.exe" "%vbsGetPrivileges%" %*
exit /B
:gotPrivileges
setlocal & pushd .
cd /d %~dp0
if '%1'=='ELEV' (del "%vbsGetPrivileges%" 1>nul 2>nul  &  shift /1)
ECHO %batchName% Arguments: %1 %2 %3 %4 %5 %6 %7 %8 %9
CLS
set hosts=C:\Windows\System32\drivers\etc\hosts
set temp=%temp%\temp.txt
ECHO.***********************************************
echo ע:��ѡһ���޸����ɣ�����Ч��ѡ�������޸�
ECHO.***********************************************
echo ��ѡ��������еĲ�����
echo 1. �޸�1
echo 2. �޸�2
echo 3. �޸�3
echo 4. �޸�4
echo 5. �޸�5
echo 6. �޸�6
echo 7. ����
echo 8. �˳�
ECHO.***********************************************
choice /c:12345678 /n /m "��������Ӧ���֣�"
goto choose%errorlevel%
:choose1
call :undo
echo 183.136.207.132 update.miui.com >> %hosts% || goto error
echo 183.136.207.132 ultimateota.d.miui.com >> %hosts% || goto error
echo 183.136.207.132 bigota.d.miui.com >> %hosts% || goto error
echo 183.136.207.132 hugeota.d.miui.com >> %hosts% || goto error
echo 183.136.207.132 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose2
call :undo
echo 47.74.196.250 update.miui.com >> %hosts% || goto error
echo 47.74.196.250 ultimateota.d.miui.com >> %hosts% || goto error
echo 47.74.196.250 bigota.d.miui.com >> %hosts% || goto error
echo 47.74.196.250 hugeota.d.miui.com >> %hosts% || goto error
echo 47.74.196.250 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose3
call :undo
echo 110.43.121.13 update.miui.com >> %hosts% || goto error
echo 110.43.121.13 ultimateota.d.miui.com >> %hosts% || goto error
echo 110.43.121.13 bigota.d.miui.com >> %hosts% || goto error
echo 110.43.121.13 hugeota.d.miui.com >> %hosts% || goto error
echo 110.43.121.13 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose4
call :undo
echo 110.43.121.249 update.miui.com >> %hosts% || goto error
echo 110.43.121.249 ultimateota.d.miui.com >> %hosts% || goto error
echo 110.43.121.249 bigota.d.miui.com >> %hosts% || goto error
echo 110.43.121.249 hugeota.d.miui.com >> %hosts% || goto error
echo 110.43.121.249 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose5
call :undo
echo 123.6.13.6 update.miui.com >> %hosts% || goto error
echo 123.6.13.6 ultimateota.d.miui.com >> %hosts% || goto error
echo 123.6.13.6 bigota.d.miui.com >> %hosts% || goto error
echo 123.6.13.6 hugeota.d.miui.com >> %hosts% || goto error
echo 123.6.13.6 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose6
call :undo
echo 183.36.23.4 update.miui.com >> %hosts% || goto error
echo 183.36.23.4 ultimateota.d.miui.com >> %hosts% || goto error
echo 183.36.23.4 bigota.d.miui.com >> %hosts% || goto error
echo 183.36.23.4 hugeota.d.miui.com >> %hosts% || goto error
echo 183.36.23.4 superota.d.miui.com >> %hosts% || goto error
ipconfig /flushdns
CLS
echo �޸��ɹ�����
msg * �޸��ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose7
call :undo
CLS
echo �����ɹ�����
msg * �����ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose8
exit
:error
ECHO.
echo �������󣡣�
msg * �������󣡣�
ECHO. ����������ر�
pause >NUL
exit
:undo
findstr /i /c:"183.136.207.132" %hosts% >nul || findstr /i /c:"47.74.196.250" %hosts% >nul || findstr /i /c:"110.43.121.13" %hosts% >nul || findstr /i /c:"110.43.121.249" %hosts% >nul || findstr /i /c:"123.6.13.6" %hosts% >nul || findstr /i /c:"183.36.23.4" %hosts% >nul || goto nocontent
findstr /i /v /c:"bigota.d.miui.com" /c:"ultimateota.d.miui.com" /c:"hugeota.d.miui.com" /c:"update.miui.com" /c:"superota.d.miui.com" %hosts% > %temp% || goto error
move /y %temp% %hosts% || goto error
ipconfig /flushdns
goto :eof
:nocontent
goto :eof