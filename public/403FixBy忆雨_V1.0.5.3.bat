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
echo ��ѡ��������еĲ�����
echo 1. �޸�
echo 2. ����
echo 3. �˳�
choice /c:123 /n /m "��������Ӧ���֣�"
goto choose%errorlevel%
:choose1
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
:choose2
findstr /i /c:"123.6.13.6" %hosts% >nul || goto nocontent
findstr /i /v /c:"bigota.d.miui.com" /c:"ultimateota.d.miui.com" /c:"hugeota.d.miui.com" /c:"update.miui.com" /c:"superota.d.miui.com" %hosts% > %temp% || goto error
move /y %temp% %hosts% || goto error
ECHO.
ipconfig /flushdns
CLS
echo �����ɹ�����
msg * �����ɹ�����
echo ����������Ч
ECHO. ����������ر�
pause >NUL
exit
:choose3
exit
:error
ECHO.
echo �������󣡣�
msg * �������󣡣�
ECHO. ����������ر�
pause >NUL
exit
:nocontent
echo hosts�޸��ѳ����������ٴγ�������
ECHO. ����������ر�
pause >NUL
exit