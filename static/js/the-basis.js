$(document).ready(function(){

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var symbols = ['FLWS','TFSCU','TFSC','PIH','FCTY','FCCY','SRCE','VNET','TWOU','SSRX','JOBS','CAFD','EGHT','SHLM','AMRK','AAON','ABMD','ACAD','ACIW','ACNB',
'AEY','ADMA','ADTN','AEPI','AEZS','AIXG','ALJJ','EMDR','RUDR','ASDR','AMAG','AYA','AMCX','UHAL','ANAD','ANIP','ANSS','ATNY','AUMA','AUMAU',
'ARCW','ARIS','ARMH','ARRS','ASBB','ASML','ATAI','AVHI','AVEO','AXTI','ABAX','ABY','ABEO','ABIL','AXAS','ACTG','ACHC','ACST','AXDX','XLRN',
'ANCX','VXDN','VXUP','ARAY','ACRX','ACET','AKAO','ACHN','ACRS','ACOR','ACTS','ACPW','ATVI','ACTA','ACUR','ACXM','ADMS','ADMP','ADAP','ADUS',
'IOTS','ADBE','ADRO','AAAP','AEIS','AMD','ADXS','ADVS','ADVM','MAUI','YPRO','AEGR','AEGN','AGLE','AEHR','AMTX','AERI','AVAV','AEMD','AFMD',
'AFFX','AGEN','AGRX','AGYS','AGIO','AGFS','AIMT','AIRM','AIRT','ATSG','AMCN','AKAM','AKTX','AKBA','AKER','AKRX','ALRM','ALSK','AMRI','ABDC',
'ADHD','ALDR','ALDX','ALXN','ALXA','ALCO','ALGN','ALIM','ALKS','ABTX','ALGT','ALLB','ABVA','AFOP','ALNC','AIQ','AHGP','ARLP','AHPI','AMOT',
'ALQA','ALLT','MDRX','AFAM','ALNY','AOSL','SMCP','GOOG','GOOGL','ATEC','ALTE','ASPS','AIMC','AFSI','AMRN','AMZN','AMBC','AMBA','DOX','AMDA',
'AMED','ASRVP','ASRV','ASBI','ATAX','AMOV','CRMT','AAL','AALCP','AGNCP','AGNC','AGNCB','ACAS','MTGEP','MTGE','ACSF','GNOW','AETI','AMIC','AMNB',
'ANAT','APEI','ARII','AMRB','ASEI','AMSWA','AMSC','AMWD','ABCB','AMSF','ATLO','AMGN','FOLD','AMKR','AMPH','IBUY','AMSG','AMSGP','ASYS','AMRS',
'ANAC','ADI','ALOG','ANLY','AVXL','ACOM','ANCB','ANDE','TGLS','ANDA','ANDAU','ANGI','ANGO','ANIK','ANNB','ATRS','ANTH','ABAC','APAGF','APIC',
'APOG','APOL','AINV','APPF','AAPL','ARCI','APDN','AGTC','AMAT','AMCC','AAOI','AREX','APRI','APTO','AQMS','KBSF','AQXP','ARQL','ARDM','ARLZ',
'PETX','ABUS','ARCB','ABIO','RKDA','ACGL','APLP','ACAT','ARDX','ARNA','ARCC','AGII','ARGS','ARIA','ARKR','ARTX','ARWAU','ARWA','ARRY','AROW',
'DWAT','ARWR','ARTNA','ARTW','ASNA','ASND','ASCMA','APWC','AZPN','ASMB','AACC','ASFI','ASTE','ALOT','ATRO','ASTC','ASUR','ATRA','ATHX','AAPC',
'AAME','ACBI','ACFC','ATNI','ATLC','AAWW','AFH','TEAM','ATML','ATOS','ATRC','ATRI','ATTU','AUBN','ADNC','AUDC','AUPH','EARS','ASPX','AACOU',
'AUTH','AMAP','ABTL','ADSK','ADP','ADPVV','AUXL','AVNR','AVXS','AVNU','AVNW','AVID','AVGR','AVIR','CAR','AWRE','ACLS','AXGN','AXSM','FISH',
'BCOM','RILY','BEAV','BEAVV','BBCN','BBXT','BCBP','BFED','BGCP','BGSCU','BIND','TECH','BIOL','BJRI','ADRA','ADRD','ADRE','ADRU','STCK','BNCN',
'BOKF','BOSC','BLMT','BSQR','BTUI','BIDU','BCPC','BWINB','BWINA','BLDP','BANF','BANFP','TBBK','BTFG','BKMU','BKYF','OZRK','BOCH','BMRC','BKSC',
'BOTJ','BFIN','BWFG','BANR','BZUN','TAPR','DTYL','DTYS','DTUL','DTUS','DFVL','DFVS','FLAT','DLBS','DLBL','STPP','BHACU','BHAC','BBSI','BSET',
'BYBK','BYLK','BV','BECN','BSF','BBGI','BBBY','BGNE','BELFB','BELFA','BLPH','BLCM','BNCL','BNFT','BNHN','BNTC','BGFV','ORPN','BPTH','BCRX',
'BDSI','BLFS','BOLT','BMRN','BIOS','BBC','BBP','BSTC','BEAT','BASI','BIOC','BIOD','BIIB','BLRX','BVXV','BSTG','BSPM','BITI','BDMS','BBOX',
'BDE','BBRY','BLKB','HAWK','BKCC','BLMN','BCOR','BUFF','BHBK','NILE','MNGL','ITEQ','BFLY','BKEP','BKEPP','BPMC','BOBE','BOFI','WIFI','BOJA',
'BONT','BONA','BNSO','BAMM','BRDR','BPFH','BPFHP','EPAY','BLVD','BLVDU','BCLI','BBRG','BBEP','BBEPP','BDGE','BBNK','BLIN','BRID','BCOV','BSFT',
'BVSN','AVGO','BYFC','BWEN','BRCD','BRKL','BRKS','BRKR','BMTC','BWLD','BLDR','BUR','CFFI','CHRW','CA','CRME','CASM','CASI','CBFV','CNLMU',
'CNLM','CBOE','CDK','CDW','CFK','CECE','CEVA','CITZ','CHEKU','CHSCP','CHSCO','CHSCL','CHSCM','CHSCN','CIFC','CMCT','CISAA','CLIR','CMFN','CME',
'CMSB','CCNE','CISG','SCOR','CNMD','COYN','PMTS','CPSH','CRAI','CSGS','CCLP','CSPI','CSRE','CSWI','CSX','CTCM','CTIC','CTIB','CUNB','CUI',
'CVBF','CVV','CYAN','CCMP','CDNS','CDZI','CACQ','CZR','CSTE','PRSS','CALM','CAMP','CLBS','CLMS','CHI','CHY','CCD','CFGE','CHW','CGO',
'CSQ','CVGW','CFNB','CALA','CALD','CLMT','ABCD','CAMBU','CAMB','CAFI','CAC','CAMT','CSIQ','CGIX','CPHC','CBNJ','CPLA','CBF','SCMFO','CCBG',
'CPLP','CSWC','CPTA','CLAC','CLACU','CFFN','CAPN','CAPNU','CAPR','CPST','CARA','CARB','CBYL','CRDC','CFNL','CSII','CATM','CDNA','CECO','CTRE',
'CKEC','CLBH','CARO','CART','CRZO','TAST','CRTN','CARV','CACB','CSCD','CWST','CASY','CASS','CATB','CBIO','CPRX','CTRX','CATY','CVCO','CAVM',
'CAZA','CPXX','CELG','CLDX','CLRB','CLLS','CBMG','ICEL','CLSN','CYAD','CEMP','CETX','CSFL','CETV','CFBK','CENTA','CENT','CVCY','CFCB','CENX',
'CNBKA','CNTY','CPHD','CRNT','CERCU','CERC','CERE','CERN','CERU','CERS','KOOL','CSBR','CYOU','HOTR','HOTRU','CTHR','GTLS','CHTR','CHFN','CHEK',
'CHKP','CAKE','CEMI','CHFC','CCXI','CHMG','CHKE','CHEV','CHMA','CBNK','PLCE','CMRX','CADC','CALI','CAAS','CBAK','CBPO','CCCL','CCCLU','CCCR',
'CCRC','JRJC','HGSH','CHLN','CNIT','CJJD','HTHT','CHNR','NKBP','CREG','CPGI','CNTF','CTFO','CXDC','CNYD','CCIH','CEDU','CNET','CHDX','IMOS',
'CDXC','CHDN','CHUY','CHYR','CDTX','CIMT','CMPR','CINF','CIDM','CTAS','CPHR','CRUS','CSCO','CTRN','CZNC','CZWI','CZFC','CIZN','CRBC','CTXS',
'CHCO','CIVBP','CIVB','CDTI','CLNE','CLNT','CLRO','CLFD','CBLI','CKSW','CSBK','CLVS','CNV','COBZ','CLCD','CSGP','COA','CWAY','COKE','CDRB',
'CDXS','CVLY','JVA','CCOI','CGNT','CGNX','CTSH','COHR','CHRS','COHU','JACQ','JACQU','CLCT','COLL','CIGI','COBK','CBAN','COLB','COLM','CMCO',
'CBMX','CMCSA','CVLT','CBSH','CBSHP','CUBN','CMFB','CVGI','COMM','CSAL','JCS','ESXB','TCFC','CFFC','CTBI','CWBC','COB','CIZ','CFA','CSF',
'CFO','GNOM','CGEN','CPSI','CTG','CHCI','CMTL','CNAT','CXRX','CCUR','CDOR','CDORP','CDORO','CFMS','CNFR','CONN','CNOB','CTWS','CNXR','CNSL',
'CWCO','CPSS','CFRXU','CFRX','CTRV','CTRL','CPRT','CRVL','CRBP','CORT','BVA','CORE','CORI','CSOD','CRVS','COSI','COST','CPAH','ICBK','CRRC',
'CVTI','COVS','COWN','CBRL','BREW','CRAY','CACC','IPLT','LPLT','DGLD','DSLV','UGLD','USLV','TVIZ','TVIX','ZIV','XIV','VIIZ','VIIX','GLDI',
'SLVO','CREE','CRESY','CXPO','CRTO','CROX','CCRN','XRDC','CRDS','CRWS','CYRX','CTRP','CBST','CPIX','CMLS','CRIS','CUTR','CYBE','CYBR','CYBX',
'CYCCP','CYCC','CBAY','CYNA','CYNO','CY','CYRN','CONE','CYTR','CYTK','CTMX','CYTX','CTSO','DARA','DBVT','XRAY','DHXM','DISH','DLHC','DNBF',
'DSKX','DSPG','CADT','CADTU','DTSI','DRRX','DXPE','DJCO','DAKT','DAIO','DTLK','DRAM','DWCH','PLAY','DTEA','DWSN','DHRM','DFRG','LEVYU','TACO',
'DCTH','DGAS','DELT','CISAU','PROJ','DENN','DEPO','DSCI','DERM','DSGX','DEST','DXLG','DSWL','DTRM','DXCM','DHIL','FANG','DCIX','DRNA','DFBG',
'DGII','DMRC','DRAD','DGLY','DCIN','APPS','DCOM','DMTX','DIOD','DPRX','DISCB','DISCK','DISCA','DITC','DVCR','SAUC','DXYN','DLTR','DGICA','DGICB',
'DMLP','DORM','EAGL','EAGLU','DOVR','DDAY','DRWI','DWA','DRYS','DLTH','DNKN','BOOM','DRCO','DYSL','DYNT','DVAX','ETFC','ECACU','ECAC','EOPN',
'EVGBC','EVLMC','EBAYV','EDAC','EDGR','EMCI','EMKR','ENG','EPIQ','EQFN','ESBF','ESSA','EPIX','VBND','VALX','ZMLP','DAX','TUTT','EVEP','EVLV',
'EXAS','EZPW','EZCH','EBMT','EGBN','EGLE','EGRX','ELNK','EWBC','EACQU','EACQ','EML','EVBS','EVSTC','EBIX','ELON','ECHO','ECTE','SATS','ESES',
'EEI','EDAP','EDGE','EDGW','EDIT','EDUC','EGLT','EIGR','LOCO','EMITF','ESLT','ERI','ESYS','ELRC','ESIO','ELSE','EA','EFII','ELECU','ELEC',
'EBIO','RDEN','CAPX','ESBK','ELTK','EMCF','EMMS','NYNY','ERS','ENTA','ECPG','WIRE','ENDP','ECYT','ELGX','EIGI','ENOC','WATT','EFOI','ERII',
'XTXI','ENPH','ESGR','ENFC','ENTG','ENTL','ETRM','EBTC','EFSC','EGT','ENZN','ENZY','EPRS','EPZM','EPOC','EQIX','EQBK','EAC','ERIE','ESCA',
'ESMC','ESPR','ESND','ETSY','CLWT','EEFT','ESEA','EVK','EVOK','EVOL','XONE','EXA','EXAC','ERW','FLAG','ROBO','EXEL','EXFO','EXLS','EXPE',
'EXPD','EXPO','ESRX','EXTR','EYEG','FFIV','FARO','FBRC','FEIC','FFNW','FLIR','FH','FRPH','FSBW','FTD','FXENP','FB','FRP','FCS','FWM',
'FALC','DAVE','FARM','FFKT','FMNB','FAST','FATE','FBSS','FDML','FNHC','FFCO','FHCO','FENX','GSM','FGEN','FCSC','ONEQ','LION','FDUS','FRGI',
'FSAM','FSC','FSFR','FITB','FITBI','FITBP','FNTC','FNTCU','FNGN','FISI','FNSR','FINL','FNJN','FEYE','FBNC','FNLC','FBMS','FRBA','BUSE','FBIZ',
'FCAL','FCVA','FCAP','FCFS','FCNCA','FCLF','FCBC','FCCO','FCFP','FBNK','FDEF','FFBC','FFIN','THFF','FFCH','FFKY','FFWM','FGBI','INBK','FIBK',
'FMFC','FRME','FMBH','FMBI','FNBC','FNFG','FNWB','FSFG','FSLR','FSBK','BICK','FEMS','FVC','FEMB','FEP','FBZ','FCA','FPA','FEM','FDT',
'FTW','FDTS','FSZ','FHK','FKO','FCAN','FEUZ','FJP','FLN','FGM','FKU','YDIV','TDIV','MDIV','FTHI','FTLB','FV','QINC','AIRR','IFV',
'RDVY','FYT','FNY','FYC','FNK','FMK','CARZ','SKYY','CIBR','FMB','FTSM','HYLS','FDIV','FTSL','LMBS','FTGC','FTAG','FTRI','FPXI','FEX',
'FTC','FTA','FNX','FAD','FAB','QABA','GRID','QCLN','FONE','QQEW','QQXT','QTEC','RFAP','RFDI','RFEU','FCVT','FYX','FTCS','TUSA','FUNC',
'FLIC','FCFC','FSV','FBMI','SVVC','FMER','FISV','FIVE','FPRX','FIVN','FLML','FLKS','SKOR','LKOR','ASET','MBSD','QLC','FLXN','FLXS','FLEX',
'FLOW','FLDM','FFIC','FOMX','FOGO','FONR','FES','CRED','VRNG','FORM','FORTY','FORR','FTNT','FBIO','FWRD','FORD','FWP','FOSL','FMI','FXCB',
'FOXF','FRAN','FELE','FRNK','FRED','RAIL','FEIM','FRPT','FTR','FTRPR','FFEX','FSYS','FTEK','FCEL','FORK','FULL','FLL','FULT','FSIN','FSNN',
'FFHL','WILC','GK','GIII','SRET','GPIA','GPIAU','GBSNU','NOVT','GSIT','GSVC','GTXI','GWPH','GWGH','GAIA','GLPG','GALT','GALTU','GALE','GLMD',
'GPIC','GLPI','GRMN','GGAC','GGACU','GARS','GKNT','GNMK','GNVC','GENC','GNCMA','GFNCP','GFN','GFNCL','GENE','GNCA','GHDX','GNTX','THRM','GTWN',
'GEOS','GABC','GERN','GEVO','ROCK','GIGA','GIGM','GILT','GILD','GBCI','GLAD','GLADP','GLADO','GOODN','GOOD','GOODO','GOODP','GAIN','GAINN','GAINO',
'GAINP','LAND','GLBZ','GBT','ENT','GBLI','GPACU','GPAC','SELF','GSOL','GWRS','QQQC','QQQV','SOCL','QQQM','ACTX','BFIT','LNGR','MILN','CATH',
'ALTY','YLCO','GAI','GBIM','GLBS','INXBU','GLRI','GLUU','GLYC','GPRO','GOGO','GLNG','GMLP','GLDC','GDEN','GOGL','GBDC','GTIM','GT','GOOAV',
'GMAN','GRSHU','GRSH','LOPE','GRVY','GBSN','GLDD','GSBC','GNBC','GRBK','GPRE','GPP','GCBC','GLRE','GRIF','GRFS','GRPN','OMAB','GGAL','GBNK',
'GFED','GUID','GIFI','GURE','GPOR','GYRO','HEES','HDS','HCAC','HFFC','HMNF','HMSY','HSNI','HTGM','HABT','HLG','HAIN','HNRG','HALL','HALO',
'HBK','HBNK','HMPR','HBHC','HNH','HAFC','HNSN','HQCL','HDNG','HLIT','HRMNU','HRMN','TINY','HBIO','HBIOV','HCAP','HAS','HAST','HA','HCOM',
'HWKN','HWBK','HAYN','HIIQ','HSTM','HCSG','HQY','HWAY','HTWR','HTLD','HTLF','HTBX','HLYS','HSII','HELE','HMNY','HMTV','HNNA','BLBD','HCACU',
'HSIC','HERO','HTBK','HFWA','HBOS','HEOP','HCCI','MLHR','HRTX','CUBA','HSKA','HIBB','HKACU','HKAC','HPJ','HIHO','HIMX','HIFS','HSGX','HOLI',
'HOLX','HBCP','HOMB','HFBL','HMST','HMIN','HTBI','CETC','HOFT','HFBC','HBNC','HZNP','HRZN','HPTX','HDP','HOTT','HMHC','HWCC','HOVNP','HBMD',
'HUBG','HSON','HDSN','HBANP','HBAN','HBANO','HPCCP','HURC','HURN','HTCH','HCM','HBP','HDRAU','HDRA','HYGS','IDSY','IAC','IBKCP','IBKC','ICFI',
'ICLR','ICUI','IDXX','IROQ','IGTE','IIVI','IKNX','INCR','INTL','IVTY','IPGP','IRIX','IRIS','IRCP','ITUS','IXYS','IKGH','IEP','ICON','IPWR',
'INVE','IDRA','IRG','RXDX','IKAN','ILMN','ISNS','IMMR','ICCC','IMDZ','IMNP','IMGN','IMMU','IPXL','IMMY','SAAS','INCY','INDB','IBCPO','IBCP',
'IBTX','IDSA','INFN','INXB','INFI','IPCC','IFON','INFA','III','IMKTA','INWK','INNL','INOD','IPHS','IOSP','ISSC','INVA','INGN','ITEK','INOV',
'INO','NSIT','ISIG','INSM','IIIN','PODD','INSY','NTEC','IARTV','IART','INMD','IDTI','IESC','INTC','IQNT','IPCI','NTLA','IPAR','ICLD','IDCC',
'INTG','IBKR','ININ','ICPT','TILE','LINK','IMI','IMCB','INAP','IBOC','ISCA','IGLD','IIJI','IDXG','XENT','INTX','ISIL','IILG','IBCA','IVAC',
'ITCI','IIN','INTU','ISRG','INVT','SNAK','ISTR','ISBC','ITIC','NVIV','IONS','IRMD','IRDM','IRDMB','IRDMU','IRWD','EUFN','ISLE','ISRL','ITI',
'ITRI','ITRN','XXIA','IZEA','JJSF','JBHT','MAYS','JCOM','JASO','JAKK','JD','JCO','WYIGU','WYIG','JKHY','JACK','JXSB','JAXB','JAGX','JMBA',
'JRVR','JSML','JSMD','JAZZ','JFBI','JSYNU','JSYN','JBLU','UBPSU','JCTCF','DATE','JST','JIVE','JBSS','JOUT','JYNT','JNP','JUNO','KSWS','KTWO',
'KCAP','KEYW','KLAC','KLREU','KLRE','KLXI','KSW','KVHI','KALU','KMDA','KNDI','KPTI','KYAK','KRNY','KELYA','KELYB','KMPH','KFFB','KERX','GMCR',
'KEQU','KTEC','KTCC','KFRC','KE','KBAL','KIN','KGJI','KINS','KONE','KIRK','KITE','KTOV','KFX','KONA','KZ','KOPN','KRNT','KOSS','KHC',
'KWEB','KTOS','KUTV','KLIC','KURA','FSTR','LMRKP','LCAV','LCNB','LDRH','LGIH','LHCG','LIND','LKQ','LMFAU','LMFA','LMIA','LMLP','LNBB','LPLA',
'LRAD','LSBI','LYTS','LJPC','BOOT','LPSB','DRIO','LSBK','LSBG','LBAI','LKFN','LAKE','LRCX','LAMR','LANC','LNDC','LARK','LMRK','LE','LSTR',
'LNTH','LTRX','LSCC','LAWS','LAYN','GAGA','LMAT','LBIX','LGCYP','LGCYO','LGCY','LTXB','DDBI','EDBI','LVHD','UDBI','TREE','LXRX','LBRDA','LBRDK',
'LILA','LILAK','LBTYA','LBTYB','LBTYK','QVCA','QVCB','LMCA','LMCK','LMCB','BATRA','BATRK','LSXMA','LSXMB','LSXMK','TAX','LTRPB','LTRPA','LVNTA','LVNTB',
'LPNT','LFVN','LCUT','LWAY','LGND','LPTH','LTBR','LLEX','LIME','LLNW','LMNR','LINC','LECO','LLTC','LINE','LNCO','LBIO','LIOX','LPCN','LQDT',
'LFUS','LIVN','LOB','LIVE','LPSN','JADE','LOJN','LOGM','LOGI','EVAR','CNCR','LORL','LABC','LOXO','LPTN','LULU','LITE','LMNX','LMOS','LUNA',
'MTSI','MAMS','MBFI','MBFIP','MBTF','MCFT','MDCA','MEIP','MTSL','MFRI','MGCD','MGEE','MGPI','MNDO','MB','MKSI','MMAC','MODL','MOCO','MPAC',
'MRVC','MSBF','MNTG','MTSC','MYOS','MYRG','MCBC','MFNC','MGNX','MCUR','MAGS','MGLN','MPET','MGIC','MNGA','MAG','MGYR','MHLD','MHLDO','MSFG',
'COOL','MMUS','MMYT','MBUU','MLVF','MANH','LOAN','MNTX','MNKD','MTEX','MANT','MARA','MCHX','MARPS','MRNS','LEDR','BBH','MKTX','MKTO','MRKT',
'MRLN','MAR','MBII','MRTN','MMLP','MRVL','MASI','MTCH','MASC','MTLS','MTRX','MAT','MATR','MATW','MFRM','MTSN','MXIM','MXWL','MFLR','MZOR',
'MGRC','MCOX','MDTH','MFIN','MTBC','MTBCP','MNOV','MDSO','MDGS','MDVN','MEDW','MDWD','MDVXU','MDVX','MEET','MPEL','MLNX','MELR','MEMP','MRD',
'MENT','MELI','MBWM','MERC','MBVT','NOIZ','MRCY','MWRX','EBSB','VIVO','MMSI','MTTX','SRIB','MACK','MERU','MSLI','MLAB','MESO','CASH','MBLX',
'MEOH','MEILU','MDXG','MIK','MCRL','MSTR','MCHP','MCLB','MU','MICT','VTSS','MSCC','MSFT','MVIS','MPB','MCEP','MOFG','MTP','MBRG','MIDD',
'MBCN','MSEX','MIME','NERV','MRTX','MIRN','MSON','MIND','MITK','MITL','MOSY','MINI','MOBL','MDSY','MLNK','MOKO','MNTA','MOMO','MCRI','MNRK',
'MDLZ','MGI','MPWR','TYPE','MNRO','MRCC','MNST','MHGC','MORN','MPAA','MDM','LABL','MFLX','MGAM','MFSF','MYL','MYOK','MYGN','IFAS','SWTX',
'NGHCO','NWLI','NBTF','NBTB','NCIT','NEWT','NFEC','EGOV','NIHD','NMIH','NNBR','NTLS','NVEE','NVEC','NVDA','NXPI','NXTD','NBRV','NAKD','NNDM',
'NSTG','NVBXU','NANO','NSPH','NK','NSSC','NDAQ','NTRA','NATH','NAUH','NKSH','FIZZ','NCMI','NCOM','NGHC','NGHCP','NHLD','NATI','NATL','NPBCO',
'NRCIA','NRCIB','NRCI','NSEC','NAII','NHTC','NATR','BABY','NAVI','NAVG','NKTR','NEO','NEOG','NEON','NEOS','NEOT','NVCN','NEPT','UEPS','CAZAU',
'NETE','NETC','NTAP','NTES','NTGR','NTCT','NTWK','NFLX','NLST','CUR','NBIX','NDRM','NURO','NEBS','NOOF','NYMTO','NYMTP','NYMT','NLNK','NEWS',
'NFSB','NWSA','NWS','NXST','NVET','NICE','NICK','NCBS','NINE','NVLS','NDLS','NORT','NDSN','NSYS','NTK','NOVB','NBN','NTIC','NTRS','NTRSP',
'NFBK','NRIM','NWBI','NWBO','NWPX','NCLH','NWFL','NVFY','NVMI','NVDQ','MIFI','NVAX','NVCR','NVGN','NUVA','NUAN','NMRX','NUTR','NTRI','NVTR',
'QQQX','NXTM','NYMX','ORLY','OIIM','OBAF','OFS','OHAI','OHRP','ON','OPNT','ORBC','OSIS','OXGN','OVLY','OASM','OMPI','OBCI','OPTT','ORIG',
'OSHC','OCFC','OCRX','OCLR','OFED','OCUL','OCLS','OMEX','ODP','OPAY','OVBC','ODFL','OLBK','ONB','OPOF','OSBC','OSBCP','OLLI','ZEUS','OFLX',
'OMER','OABC','OMCL','OTIV','OGXI','ONCS','OMED','ONTX','ONTY','STKS','OHGI','ONFC','ONVI','OPGN','OTEX','OPXA','OPHT','OBAS','OCC','OPHC',
'OPB','OSUR','ORMP','ORBK','OREX','SEED','OESX','ORIT','ORRF','OFIX','OSIR','OSN','OTEL','OTT','OTIC','OTTR','OUTD','OUTR','OVAS','OSTK',
'OXBRU','OXBR','OXFD','OXLC','OXLCN','OXLCO','OXLCP','PFIN','PTSI','PCAR','PRXL','PAVMU','PBBI','PSBH','PCCC','PCTI','PCMI','PDCE','PDFS','PDLI',
'PFSW','PGTI','ANTP','PHII','PHIIK','PICO','PMFG','USLB','PRAH','PRGX','PVBC','PTC','PTCT','PACW','PACEU','PACE','PACB','PCBC','PCBK','PEIX',
'PMBC','PPBI','PAAC','PAACU','PCRX','PTIE','PLMT','PMTI','PAAS','PNRA','PANL','PSOF','PTRY','PZZA','FRSH','PRGN','PRTK','PCYG','PSTB','PKOH',
'PKBK','PRKR','PARN','PTNR','PBHC','PATK','PNBK','PATI','PEGI','PDCO','PTEN','PAYX','PCTY','PYDS','PYPL','SKIS','PGC','PRLS','PEGA','PCO',
'PENX','PENN','PENNV','PNNT','PFLT','PWOD','PTXP','PBCT','PEBO','PEBK','PEOP','PFBX','PFIS','PUB','PRCP','PPHM','PPHMP','PSMI','PWRD','PRFT',
'PFMT','PERF','PERI','PESI','SOMX','PTX','PERY','PGLC','PVSW','PETM','PETS','PAHC','PHMD','PLAB','FACE','PIRS','PPC','CGEIU','PME','PNK',
'PNKZV','PNFP','PPSI','PXLW','PLNR','PLPM','PLXS','PLUG','PLBC','PSTI','PBSK','PNTR','PCOM','PTEK','PLCM','POOL','POPE','PLKI','BPOP','BPOPN',
'BPOPM','PBIB','PTLA','PBPB','PCH','POWL','POWI','PSIX','LALT','PDBC','DWIN','DWTR','PNQI','PSTL','PKOL','PSAU','LDRI','IPKW','PAGG','IDLB',
'PRFZ','PWND','PMNA','QQQ','PSCM','PSCE','PSCF','PSCH','PSCI','PSCT','PSCD','PSCC','PSCU','PRAA','PRAN','PFBC','PLPC','PFBI','PINC','PRWT',
'LENS','PLFE','PRST','PSMT','PCLN','PBMD','PNRG','PRMW','PRIM','PSET','PY','PRZM','PVTB','PVTBP','PDEX','DNAI','PRPH','PRQR','SQQQ','BIB',
'TQQQ','ZBIO','BIS','PKT','IPDN','PFIE','PGNX','PRGS','PFPT','RNA','UBIO','PSEC','PRTO','PTI','PRTA','PWX','PROV','PBIP','PMD','PULB',
'PULM','PCYO','PXS','QADA','QADB','QCRH','QLTI','QLGC','QCOM','QPAC','QGEN','QIWI','QLIK','QRVO','QLTY','QSII','QBAK','QLYS','QTET','QRHC',
'QUIK','QDEL','QNST','JASN','QPACU','QUMU','QUNR','QTNT','RADA','RDCM','ROLL','RICK','RCMT','RFIL','RGCO','RLJE','RMGN','RMR','ROIQU','ROIQ',
'RPXC','RRD','RRM','RTIX','RXII','RDNT','RSYS','ROIAK','ROIA','RDUS','RDWR','RMBS','RMTR','RAND','RLOG','GOLD','RPD','RPTP','RAVE','RAVN',
'RDA','RLOC','RDI','RDIB','RGSE','RELY','RNWK','RP','UTES','QYLD','RCON','REPH','RRGB','RRR','RDHL','REGN','RGNX','RGLS','REIS','RELV',
'RLYP','MARK','RNST','REGI','RNVA','RCII','RTK','RGEN','RPRX','RPRXZ','RBCAA','FRBK','REFR','RESN','REXI','RECN','ROIC','ROICU','SALE','RTLX',
'RTRX','RVNC','RVLT','RWLK','REXX','RITT','RIBT','RELL','RNET','RIGL','NAME','RTTR','RIVR','RVBD','RVSB','ROCM','FUEL','RMTI','RCKY','RMCF',
'RSTI','ROKA','ROSG','ROST','ROVI','RBPAA','RGLD','RBCN','RUSHB','RUSHA','SCLP','SGGG','SCOG','RUTH','RYAAY','STBA','EMIF','SANW','SYBTP','SAEX',
'SAGE','SBFG','SBFGP','SBAC','SCYX','SEIC','SGOC','SIFI','SINA','SLMAP','SLM','SLMVV','JSM','SLMBP','ISM','OSM','SMT','SMTX','SP','SGRP',
'SPSC','SSNC','STAA','SSKN','SIVB','SIVBO','SBRA','SBRAP','SABR','SAFT','SGNT','SAIA','SAJA','SALM','SAL','SLXP','SNDK','SAFM','SASR','SGMO',
'SANM','SPNS','SAPE','SRPT','SCSC','SMIT','SCHN','SCHL','SCLN','SQI','SGMS','SNI','SEAC','SPNE','SBCF','STX','SHIP','SRSC','SHLD','SHLDV',
'SHOS','SGEN','EYES','SCWX','SNFCA','SLCT','SCSS','SIGI','LEDS','SMLR','SMTC','SENEA','SENEB','SNMX','SQNM','SQBG','MCRB','SREV','SFBS','SEV',
'SVBI','SHSP','SMED','SHEN','SHLO','SHPG','SCVL','SHBI','SHOR','SFLY','SIEB','SIEN','BSRR','SWIR','SIFY','SIGM','SGMA','SGNL','SBNY','SLGN',
'SILC','SGI','SIMG','SLAB','SIMO','SPIL','SRAQU','SRAQ','SSRI','SAMG','SFNC','SMPL','SLP','SBGI','FSCI','SMACU','SMAC','SINO','SVA','SIRI',
'SIRO','SRVA','SITO','SZMK','SKUL','SKYS','MOBI','SKYW','SKLNU','SKLN','SPU','SWKS','SMBK','SPRO','SWHC','SMSI','LNCE','SODA','SOHU','SLRC',
'SUNS','SCTY','SEDG','SOMH','SONC','SOFO','SONS','SYNM','SPHS','SORL','SRNE','SOHO','SFBC','SSB','SOCB','SCMF','SFST','SMBC','SONA','SBSI',
'OKSB','OKSBP','SPAN','SBSA','SPKE','ONCE','SPAR','SPTN','SPNC','SPPI','ANY','SPEX','SPI','SAVE','SPLK','USMO','SPOK','SPCHB','SPCHA','SPWH',
'SBPH','FUND','SFM','SQBK','STAF','STMP','STLY','SPLS','SBLK','SBUX','STRZB','STRZA','STFC','STBZ','SIBC','SNC','STDY','GASS','STLD','SMRT',
'SBOT','STEM','STML','STXS','SRCL','SRCLP','STRL','SHOO','SSFN','SYBT','BANX','SGBK','SSYS','STRT','STRS','STRA','STRM','SBBP','STB','SCMP',
'SUMR','SMMF','SSBI','SMMT','SNBC','SNHY','STKL','SPWR','SEMI','SNSS','RUN','SBCP','SSH','SUNW','SMCI','SPMD','SPCB','SCON','SGC','SUPN',
'SPRT','SRDX','SGRY','SCAI','SBBX','STRN','SYKE','SYMC','SSRG','SYNC','SYNL','SYNA','SNCR','SNDX','STRC','SGYP','SGYPU','ELOS','SNPS','SNTA',
'SYNT','SYMX','SYUT','SYPR','SYRX','TMUS','TMUSP','TROW','TATT','TTOO','TASR','TCPC','AMTD','FSII','TSRO','TESS','THRD','TFSL','TGTX','TCRD',
'TIBB','TICC','TIII','TIL','TOPS','TORM','TPCG','TCON','TSRI','TTMI','TAIT','TTWO','TLMR','TNDM','TLF','TNGO','TANH','TEDU','TAYCP','TAYCO',
'TAYD','TEAR','TECD','TTGT','TCCO','TGEN','TECU','TTEC','ERIC','TNAV','TLGT','WRLS','TENX','GLBL','TERP','TVIA','TRTL','TRTLU','SZYM','TBNK',
'TESO','TSLA','TSRA','TTEK','TLOG','TTPH','TCBI','TCBIP','TXN','TXRH','ABCO','CG','CHEF','ENSG','HCKT','MDCO','PRSC','BITE','SAVB','ULTI',
'NCTY','TST','TBPH','THRXV','THLD','TIVO','TTS','TSBK','TIPT','TITN','TTNP','TBRA','TKAI','TNXP','TISA','TRCH','TRMD','TOFC','TSEM','TW',
'TWER','CLUB','TOWN','TSCO','TSRE','TWMC','TACT','TGA','TRNS','TBIO','TTHI','TZOO','TRVN','TCBK','TRS','TRIL','TRMB','TRIB','TTPA','TRIP',
'TSC','TBK','TRIV','TROV','TROVU','TRUE','THST','TRST','TRMK','TUBE','TCX','TUDO','TUES','TOUR','HEAR','TUTI','FOX','FOXA','TWIN','TRCB',
'PRTS','USEG','GROW','UFPT','UMBF','USCR','ECOL','USATP','USAT','USAK','USMD','UTSI','UBIC','UBNT','ULTA','UCTT','RARE','ULBI','ULTR','UTEK',
'UMPQ','UNXL','UNAM','GTSI','UNIS','UBSH','UNB','UDRL','QURE','UBCP','UBOH','UBSI','UCBA','UCBI','UCFC','UDF','UBNK','UFCS','UIHC','UNFI',
'UNTD','UBFO','USBI','USLM','UTHR','UG','UNTY','JTPY','OLED','UEIC','UFPI','ULH','USAP','UVSP','UPIP','UPLD','URRE','URBN','UPI','UTMD',
'GNRX','PPH','VDSI','VBIV','WOOF','CSB','CDL','CDC','CIL','CSA','CID','VIST','VVUS','VOXX','VSEC','VWR','VYFC','VALU','VNDA','VTIP',
'BNDX','VCIT','VIGI','VNQI','VYMI','VGIT','VGLT','VCLT','VMBS','VNRCP','VNRBP','VNRAP','VNR','VTWV','VTWG','VTHR','VONV','VONG','VONE','VTWO',
'VCSH','VGSH','VXUS','VWOB','VPCOU','VRNS','VBLT','VASC','VECO','APPY','VRA','VCYT','VSTM','VRNM','VCEL','VRNT','VRSN','VRSK','VBTX','VRML',
'VSNT','VSAR','VTNR','VRTX','VRTB','VSAT','VIAB','VIA','VIAS','VIAV','VICL','VICR','CEZ','VUSE','VIDI','VDTH','VRAY','VKTX','VBFC','VLGEA',
'VIMC','VIP','VNOM','VIRC','VA','VIRT','VSCP','VRTS','VRTU','VISN','VTGN','VTAE','VTL','VTNC','VOD','VLTC','VYGR','VUZI','WDFC','WTFCM',
'WLRHU','WLRH','WMIH','WBKC','WPCS','WPPGY','WSB','WSFS','WSCI','WVFC','WGBS','WBA','WRES','WBCO','WAFD','WASH','WFBI','WSBF','WVE','WAYN',
'WSTG','WEB','WBMD','WB','WEBK','WEN','WERN','WSBC','WTBA','WSTC','WMAR','WABC','WBB','WSTL','WDC','WLBC','WFD','WLBPZ','WLB','WPRT',
'WWAY','WEYS','WHLRP','WHLR','WHF','WFM','WILN','WHLM','WVVI','WLDN','WLFCP','WLFC','WLTW','WIBC','WIN','WINT','WING','WINA','WWIN','WINS',
'WTFC','DXGE','WETF','JGBB','DXKW','DXPS','CXSE','GULF','EMCB','AGND','DGRE','HYZD','HYND','DGRW','DXJS','CRDT','EMCG','DGRS','AGZD','UBND',
'WIX','WWD','WKHS','WRLD','XWES','WOWO','WMGI','TRNX','WYNN','XTLB','XBIT','XELB','XOMA','XRSC','XCRA','XNCR','XBKS','XNPT','XENE','XLNX',
'XPLR','XCOM','XNET','MESG','YRCW','YY','YHOO','YNDX','YIN','YONG','YORW','YOD','YCB','YTEC','YECO','HTWO','ZAIS','HOGS','ZIOP','ZFGN',
'ZAGG','ZBRA','ZLTQ','ZHNE','ZAVVV','ZG','Z','ZN','ZION','ZIPR','ZIXI','ZGNX','ZSAN','ZUMZ','ZYNE','ZNGA','LIFE','ATHN','BEBE','BLUE',
'EBAY','EFUT','EGAN','EHTH','LONG','PLUS','ICAD','DSKY','KANG','IPAS','IRBT','SLQD','TLT','IFEU','IFGL','IFNA','EVAL','EGRW','EMEY','EEME',
'EEMA','EMDI','ACWI','AXFN','ACWX','EWZS','MCHI','AAXJ','SCZ','IEUS','JKI','IBB','AIA','ICLN','IGF','WOOD','INDY','SOXX','ISHG','IGOV',
'MPCT','AAIT','UAE','ENZL','AXJS','FCHI','IXUS','QAT','EEML','GNMA','COMT','CALL','PSDV','PDVW','VTVT','XGTI'
];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'symbols',
  source: substringMatcher(symbols)
});

});