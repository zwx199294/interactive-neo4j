<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String themeId = request.getParameter("themeId");
	String themeName = request.getParameter("themeName");
%>
		<title></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<base href="<%=basePath%>">
		<link rel="stylesheet" href="js/element-ui/lib/theme-chalk/index.css">
		<link rel="stylesheet" href="css/interpret.css">
		<script src="assets/jquery.min.js"></script>
		<script src="js/vue.js"></script>
		<script src="js/element-ui/lib/index.js"></script>
		<script type="text/javascript" src="js/qrcode.min.js"></script>
	</head>
	<body class="body">
		<input id="themeName" type="hidden" value="<%=themeName%>" />
		<input id="themeId" type="hidden" value="<%=themeId%>" />
		<iframe style="display: none;" id="download_iframe"></iframe>
		<div id="app" class="left" v-cloak>
			<el-container>
				<el-header>
					<div class="header_logo">
						<a href="#" target="_self">
							<img src="./imgs/scjg/scjgj_logo.png">
						</a>
					</div>
					<div class="header_logo">
						<img style="padding-left: 25px;" src="./imgs/scjg/yjsycb_logo.png">
					</div>
				</el-header>
				<el-main>
					<div class="banner" style="background-image: url(./imgs/scjg/zt/zt_bg1.png);">
						<div class="banner-nav">
							<div style="width: 65%">
								<span class="container-title">
									我要开办企业</span><br>
								<span class="container-title2">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;按照湖南省“一件事一次办”改革要求，将原来开办企业过程中，需要办理的设立登记、公章刻制、申领发票三个环节“一揽子”
									事打包形成企业和群众眼中的“我要开办企业”一件事，并提供“一次告知、一次表单、一次联办、一次办好”方式的集中式套餐服务，
									着力解决企业和群众在办事过程中的“看不懂、办不明、办事慢、办事烦”的堵点问题，提高人民群众的满意度和获得感。</span><br>
								<el-button style="width: 25%;background-color: #ef6d2d;margin-top: 5%;border: 1px solid #ef6d2d;color: #ffffff;" 
								@click="gotoAsk">立即办理</el-button>
							</div>
						</div>
					</div>
					<div class="hot-point">
						<ul class="hot-word-ul">
							<li v-for="item in tabs" :class="item.isSelected ? 'hot-word-li active': 'hot-word-li'" @click="selectTab(item)">
								<a class="md">
									<span class="hot-word-span">
										<img :src="item.isSelected ? './imgs/scjg/zt/'+item.selImg : './imgs/scjg/zt/'+item.unselImg"><br>
										<span :style="item.isSelected ? 'color: #ef6d2d;': 'color: #666666;'">{{item.name}}</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="anmao" id="jbxx"></div>
					<div class="common_width" v-show="tabs[0].isSelected">
						<div>
							<div class="dh">
								<span class="dh-title">改革前后对比</span>
							</div>
							<div class="dh-title-content">
									<h4>过去“开办企业”</h4>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请人先到市场监管部门办理营业执照，刻制公章到公安部门办理印章备案，再去税务部门办理税务事宜，领购发票。
									<h4>现在“开办企业”</h4>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请人通过线上智能导办一次告知适合申请人具体情况的办事材料清单，到市场监管部门综合窗口或线上受理平台，一次提交材料，即可，市场监管部门协同公安、税务实现一次联办，由综合窗口统一送达营业执照、印章、发票等办件结果。
									<h4>改革成果</h4>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请人跑的部门减少了：原来要跑三个部门，现在只跑一个部门；
									开办企业时限缩短了：原来办营业执照需要1个工作日，公章刻制1个工作日，税务事项1个工作日，共计3个工作日；现在实现联办，只需2个工作日。
							</div>
						</div>
						<div>
							<div class="dh">
								<span class="dh-title">适应范围</span>
							</div>
							<div class="dh-title-content">
								<div><img src="./imgs/scjg/zt/gou.png"><span>（一）非公司制企业法人；</span></div>
								<div><img src="./imgs/scjg/zt/gou.png"><span>（二）公司（有限责任公司和股份有限公司）；</span></div>
								<div><img src="./imgs/scjg/zt/gou.png"><span>（三）属于湖南省市场监管局审批的其他企业；</span></div>
								<div><img src="./imgs/scjg/zt/gou.png"><span>（四）暂不包括外资、港澳台企业；</span></div>
							</div>
						</div>
						<div>
							<div class="dh">
								<span class="dh-title">申请材料</span>
							</div>
							<div class="dh-title-content">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请人可通过智能引导系统，说明情况、提出要求，由智能引导系统告知满足申请人特定需求的、精确的申请材料清单。
							</div>
						</div>
						<div>
							<div class="dh">
								<span class="dh-title">开办流程</span>
							</div>
							<div align="center">
								<el-image v-if="!ie" src="./imgs/flowchart/A1001.png">
									<div slot="error">
										<i class="el-icon-picture-outline"></i>暂无流程
									</div>
								</el-image>
								<img v-if="ie" alt="暂无流程" src="./imgs/flowchart/A1001.png" />
							</div>
						</div>
					</div>
					<div class="common_width" v-show="tabs[1].isSelected">
						<div>
							<div class="dh">
								<span class="dh-title">市场主体</span>
							</div>
							<div class="dh-title-content">
								<h4>(1)企业法人</h4>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业法人是以指营利为目的，从事生产经营活动的法人。法人是具有民事权利能力和民事行为能力，依法独立享有权利和承担民事义务的组织。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业法人主要分为：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）全民所有制企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）集体所有制企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）联营企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）在中华人民共和国境内设立的中外合资经营企业、中外合作经营企业和外资企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（五）私营企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（六）依法需要办理企业法人登记的其他企业。
								<h4>(2) 公司</h4>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司是指依照公司法在中国境内设立的有限责任公司和股份有限公司。
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司是企业法人，有独立的法人财产，享有法人财产权。公司以其全部财产对公司的债务承担责任。有限责任公司的股东以其认缴的出资额为限对公司承担责任；股份有限公司的股东以其认购的股份为限对公司承担责任。
								<h4>有限责任公司</h4>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由50个以下的股东出资设立，每个股东以其所认缴的出资额对公司承担有限责任，公司法人以其全部资产对公司债务承担全部责任的经济组织。该种类型是较为适用于创业的企业类型，大部分的投融资方案、VIE架构等都是基于有限责任公司进行设计的。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一人有限责任公司，是指只有一个自然人股东或者一个法人股东的有限责任公司。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国有独资公司，是指国家单独出资、由国务院或者地方人民政府授权本级人民政府国有资产监督管理机构履行出资人职责的有限责任公司。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有限责任公司（有限公司）是我国企业实行公司制最重要的一种组织形式，指根据《中华人民共和国公司登记管理条例》规定登记注册。其优点是设立程序比较简单，不必发布公告，也不必公布账目，尤其是公司的资产负债表一般不予公开，公司内部机构设置灵活。其缺点是由于不能公开发行股票，筹集资金范围和规模一般都比较小，难以适应大规模生产经营活动的需要。因此，有限责任公司（有限公司）这种形式一般适于中小型非股份制公司。
								<h4>股份有限公司</h4>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由2人以上200人以下的发起人组成，公司全部资本为等额股份，股东以其所持股份为限对公司承担责任。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;股份有限公司有以下特征：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）股份有限公司是独立的经济法人；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）股份有限公司的股东人数不得少于法律规定的数目，如法国规定，股东人数最少为7人；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）股份有限公司的股东对公司债务负有限责任，其限度是股东应交付的股金额；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）股份有限公司的全部资本划分为等额的股份，通过向社会公开发行的办法筹集资金，任何人在缴纳了股款之后，都可以成为公司股东，没有资格限制；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（5）公司股份可以自由转让，但不能退股；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（6）公司账目须向社会公开，以便于投资人了解公司情况，进行选择；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（7）公司设立和解散有严格的法律程序，手续复杂。由此可以看出，股份有限公司是典型的"资合公司"。一个人能否成为公司股东决定于他是否缴纳了股款，购买了股票，而不取决于他与其他股东的人身关系，因此，股份有限公司能够迅速、广泛、大量地集中资金。同时，我们还可以看到，虽然无限责任公司、有限责任公司、两合公司的资本也都划分为股份，但是这些公司并不公开发行股票，股份也不能自由转让，证券市场上发行和流通的股票都是由股份有限公司发行的，因此，狭义地讲，股份公司指的就是股份有限公司。
								<!-- <h4>分公司</h4>
								分公司是指公司在其住所以外设立的从事经营活动的机构。分公司不具有企业法人资格，没有独立的名称，其名称应冠以总公司的名称，由总公司依法设立，只是公司的一个分支机构。设立分公司，应当向公司登记机关申请登记，领取营业执照。
								<h4>(3) 独资企业</h4>
								个人出资经营、归个人所有和控制、由个人承担经营风险和享有全部经营收益的企业。投资人以其个人财产对企业债务承担无限责任。适用于个人小规模的小作坊、小饭店等，常见于对名称有特殊要求的企业。
								<h4>(4) 合伙企业</h4>
								合伙企业是指由各合伙人订立合伙协议，共同出资，共同经营，共享有收益，共担风险，并对企业债务承担无限连带责任的营利性组织。合伙企业分为普通合伙企业和有限合伙企业。 -->
							</div>
						</div>
						<div>
							<div class="dh">
								<span class="dh-title">印章</span>
							</div>
							<div class="dh-title-content">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;印章包括公章和具有法律效力的个人名章。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公章是指国家机关、人民团体、社会组织、企业单位、事业单位、个体工商户以及其他组织（以下简称“单位或者机构”）的法定名称章,单位或者机构冠以法定名称的内设机构章、分支机构章和合同、财务、发票、审验、报关等业务专用章。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具有法律效力的个人名章是指单位或者机构的法定代表人、经营者、主要负责人以及财务负责人等人员用于非因私事务的个人名章。<br>
								<span style="font-weight: bold;">长沙市印章刻制企业一览表</span><br>
								<table border="0" cellspacing="0" cellpadding="0" class="table-other">
									<thead>
										<tr>
											<th width="30%">企业名称</th>
											<th width="35%">地点</th>
											<th width="15%" style="border-right: 0px solid #ebeef5;">电话</th>
										</tr>
									</thead>
									<tbody>
										<tr >
										    <td>长沙衡湘印章有限公司</td>
										    <td>刘家冲北路</td>
										    <td>18874242101</td>
										  </tr>
										  <tr >
										    <td >长沙市雕刻工艺厂</td>
										    <td>长沙市天心区芙蓉南路与湘府路交汇的湘府东苑4栋</td>
										    <td>13212610746</td>
										  </tr>
										  <tr >
										    <td >长沙恒禾印章有限公司</td>
										    <td>长沙市天心区涂家冲美景韩国街1018号</td>
										    <td>18674869005</td>
										  </tr>
										  <tr >
										    <td >长沙亚宏印章有限公司</td>
										    <td>长沙市天心区裕南街街道南湖路315号门面</td>
										    <td>18670909696</td>
										  </tr>
										  <tr >
										    <td >长沙市吉祥印章有限公司</td>
										    <td>长沙市天心区书院路444号</td>
										    <td>15388921968</td>
										  </tr>
										  <tr >
										    <td >长沙市德印雕刻有限公司</td>
										    <td>长沙市天心区城南路016号102房</td>
										    <td>13548956337</td>
										  </tr>
										  <tr >
										    <td >长沙宏章印章有限公司</td>
										    <td>长沙市天心区南门口晏家塘7号楼7栋809房</td>
										    <td>15112251970</td>
										  </tr>
										  <tr >
										    <td >长沙正福印章有限公司</td>
										    <td>长沙市天心区城南路63号602房</td>
										    <td>13308451684</td>
										  </tr>
										  <tr >
										    <td >长沙汉玺印章工艺有限公司</td>
										    <td>长沙市天心区友谊社区别墅1-18号</td>
										    <td>13755166886</td>
										  </tr>
										  <tr >
										    <td >长沙金印印章有限公司</td>
										    <td>长沙市天心区青园街道友谊社区B1栋13号</td>
										    <td>18573112892</td>
										  </tr>
										  <tr >
										    <td >长沙宝章印章有限公司</td>
										    <td>长沙市天心区新开铺211号第6栋</td>
										    <td>13607487251</td>
										  </tr>
										  <tr >
										    <td >湖南文艺印章有限公司</td>
										    <td>长沙市天心区赤岭路街道竹塘西路银杏家园2栋一单元4号房</td>
										    <td>18163701906</td>
										  </tr>
										  <tr >
										    <td >长沙儒雕文化传播有限公司</td>
										    <td>长沙市天心区金盆岭街道赤岭路45号</td>
										    <td>13973167108</td>
										  </tr>
										  <tr >
										    <td >长沙市晶莹印章有限公司</td>
										    <td>长沙市天心区跃进路024栋107房</td>
										    <td>13787780008</td>
										  </tr>
										  <tr >
										    <td >长沙鼎玺印章有限公司</td>
										    <td>湖南省长沙市天心区涂家冲S区1，2栋117室</td>
										    <td>15111466788</td>
										  </tr>
										  <tr >
										    <td >长沙真智印章有限公司</td>
										    <td>湖南省长沙市天心区湘府路白沙世纪佳园西区五栋101房</td>
										    <td>18163773230</td>
										  </tr>
										  <tr >
										    <td >长沙万玺印章有限公司</td>
										    <td>湖南省长沙市天心区五一西路三泰街24号景江东方1505房</td>
										    <td>13907486832</td>
										  </tr>
										  <tr >
										    <td >长沙红双喜印章有限公司</td>
										    <td>长沙市天心区修文街小桥子48号</td>
										    <td>13397484999</td>
										  </tr>
										  <tr >
										    <td >长沙市创意印章有限公司</td>
										    <td>长沙市雨花区红星糖酒城34栋626号</td>
										    <td>13707482183</td>
										  </tr>
										  <tr >
										    <td >长沙市顺达印章有限公司</td>
										    <td>长沙市雨花区韶山中路422号</td>
										    <td>13100255808</td>
										  </tr>
										  <tr >
										    <td >长沙市开泰印章有限公司</td>
										    <td width="439">长沙市雨花区车站南路36号（树木岭立交桥西）</td>
										    <td>13308471139</td>
										  </tr>
										  <tr >
										    <td >长沙市雄飞广告有限公司</td>
										    <td>长沙市雨花区劳动西路468号</td>
										    <td>13974886288</td>
										  </tr>
										  <tr >
										    <td >长沙博弘印章有限公司</td>
										    <td>长沙市雨花区曙光中路541号</td>
										    <td>15580801777</td>
										  </tr>
										  <tr >
										    <td >长沙长雕印章有限公司</td>
										    <td>长沙市雨花区东二环678号长沙海关9号门面</td>
										    <td>18908484999</td>
										  </tr>
										  <tr >
										    <td >长沙市雨花区银税印章制作有限公司</td>
										    <td>长沙市雨花区红星农民新村1栋4号</td>
										    <td>13687326076</td>
										  </tr>
										  <tr >
										    <td >长沙华海印章有限公司</td>
										    <td>长沙市雨花区韶山北路497号</td>
										    <td>13574868665/18670709065</td>
										  </tr>
										  <tr >
										    <td >长沙市晖旺雕刻有限公司</td>
										    <td>长沙市雨花区人民中路42号</td>
										    <td>18173107991</td>
										  </tr>
										  <tr >
										    <td >长沙宏升印章有限公司</td>
										    <td>长沙市雨花区竹塘中路389号</td>
										    <td>13297405253/13755166886</td>
										  </tr>
										  <tr >
										    <td >长沙市锦上印章有限公司</td>
										    <td>长沙市雨花区韶山南路197号</td>
										    <td>13908456150</td>
										  </tr>
										  <tr >
										    <td >长沙市罗山防伪印章有限公司</td>
										    <td>长沙市望城区旺旺中路293号</td>
										    <td>18273176353</td>
										  </tr>
										  <tr >
										    <td >望城神光防伪印章有限公司</td>
										    <td>长沙市望城区高塘岭街道郭亮北路538号</td>
										    <td>13875837018</td>
										  </tr>
										  <tr >
										    <td >长沙市信诚雕刻有限公司</td>
										    <td>长沙市望城区高塘岭街道郭亮北路523号</td>
										    <td>13517470246</td>
										  </tr>
										  <tr >
										    <td >长沙市望城区文明刻章服务有限公司</td>
										    <td>长沙市望城区高塘岭街道郭亮中路41号</td>
										    <td>13170484109</td>
										  </tr>
										  <tr >
										    <td >长沙市望城区旺源印章有限公司</td>
										    <td>长沙市望城区高塘岭街道文源中路66号</td>
										    <td>13808433794</td>
										  </tr>
										  <tr >
										    <td >长沙尚旺防伪印章有限公司</td>
										    <td>长沙市望城区月亮岛街道润和星城9栋</td>
										    <td>13723863982</td>
										  </tr>
										  <tr >
										    <td >长沙市睿宏印章有限公司</td>
										    <td>长沙市望城区月亮岛街道恒大名都小区5-7栋113号</td>
										    <td>15308421992</td>
										  </tr>
										  <tr >
										    <td >长沙创大印章有限公司</td>
										    <td>长沙市浏阳河路32号1栋205房</td>
										    <td>13397495030</td>
										  </tr>
										  <tr >
										    <td >长沙市成展印章有限公司</td>
										    <td>长沙市三一大道282号204房</td>
										    <td>18908496190</td>
										  </tr>
										  <tr >
										    <td >长沙市梧桐印章有限公司</td>
										    <td>长沙市车站北路328号</td>
										    <td>13548662652</td>
										  </tr>
										  <tr >
										    <td >长沙市福泰印章有限公司</td>
										    <td>长沙市秀峰商贸城5栋105号</td>
										    <td>18390897399</td>
										  </tr>
										  <tr >
										    <td >湖南省八玺防伪印章有限公司</td>
										    <td>长沙市秀峰商贸城22栋</td>
										    <td>18274856979</td>
										  </tr>
										  <tr >
										    <td >湖南省智淋网络电子印章开发有限公司</td>
										    <td>长沙市芙蓉中路一段161号新时代广场912室</td>
										    <td>15387543239</td>
										  </tr>
										  <tr >
										    <td >长沙市骏龙印章有限公司</td>
										    <td>长沙市开福区青竹湖镇天井社区10栋114号</td>
										    <td>13508477737</td>
										  </tr>
										  <tr >
										    <td >长沙衡发印章有限公司</td>
										    <td>长沙市开福区东风路街道福安乡胜利村</td>
										    <td>18008485094</td>
										  </tr>
										  <tr >
										    <td >长沙市恩忆雕刻工艺有限公司</td>
										    <td>长沙市开福区伍家岭泰阳商城1楼8号</td>
										    <td>18163701906</td>
										  </tr>
										  <tr >
										    <td >长沙市罗山一防伪印章有限公司</td>
										    <td>岳麓区枫林二路481号</td>
										    <td>15388040481</td>
										  </tr>
										  <tr >
										    <td >长沙创业印章有限公司</td>
										    <td>岳麓区桐梓坡35栋B105门面</td>
										    <td>18163642582</td>
										  </tr>
										  <tr >
										    <td >长沙市木沙印章有限公司</td>
										    <td>岳麓区银双路406号西头门面5号</td>
										    <td>13974933703</td>
										  </tr>
										  <tr >
										    <td >长沙市志伟印章有限公司</td>
										    <td>岳麓区银盆岭街道银盆北路第12-1栋02号门面</td>
										    <td>13975852567</td>
										  </tr>
										  <tr >
										    <td >长沙市速马印章服务有限公司</td>
										    <td>岳麓区西湖街道枫林一路409号荷叶塘安置楼001栋</td>
										    <td>15873190566</td>
										  </tr>
										  <tr >
										    <td >长沙市恒业达印章有限公司</td>
										    <td>岳麓区银盆岭街道银双路205号</td>
										    <td>13677319918</td>
										  </tr>
										  <tr >
										    <td >长沙市鹏达印章有限公司</td>
										    <td>岳麓区天顶街道青山村雷锋大道南路111号</td>
										    <td>15575117280</td>
										  </tr>
										  <tr >
										    <td >长沙市岳麓区荣湾雕刻社</td>
										    <td>岳麓区爱民路62号</td>
										    <td>13974907896</td>
										  </tr>
										  <tr >
										    <td >长沙达信刻章服务有限公司</td>
										    <td>岳麓区望岳街道杜鹃路联美嘉园2栋1321号</td>
										    <td>18684740077</td>
										  </tr>
										  <tr >
										    <td >长沙励志印章有限公司</td>
										    <td>岳麓区望岳街道金星北路一段13号东风本田4S店旁</td>
										    <td>17375760556</td>
										  </tr>
										  <tr >
										    <td >长沙市长顺印章有限公司</td>
										    <td>岳麓区望城坡街道咸嘉湖西路158号</td>
										    <td>13142058938</td>
										  </tr>
										  <tr >
										    <td >湖南省八顺防伪印章有限公司</td>
										    <td>岳麓区望岳街道金星北路景芳新寓小区北栋27号</td>
										    <td>13212610746</td>
										  </tr>
										  <tr >
										    <td >长沙御升源印章制作有限公司</td>
										    <td>岳麓区岳麓街道黄鹤小区3片7栋</td>
										    <td>15200596166</td>
										  </tr>
										  <tr >
										    <td >长沙市文顺印章有限公司</td>
										    <td>长沙高新开发区麓谷谷园路38号麓谷加州阳光5栋103号</td>
										    <td>13187319168</td>
										  </tr>
										  <tr >
										    <td >长沙市宇庭印章有限公司</td>
										    <td>长沙市高新区枫林三路1161号</td>
										    <td>15873186898</td>
										  </tr>
										  <tr >
										    <td >长沙御之玺印章有限公司</td>
										    <td>长沙高新开发区东方红镇金南村金南家园11栋106房</td>
										    <td>13874951947</td>
										  </tr>
										  <tr >
										    <td >长沙追月刻章有限公司</td>
										    <td>长沙县星沙街道杉仙岭社区三区50栋</td>
										    <td>13739082789</td>
										  </tr>
										  <tr >
										    <td >长沙县星沙小青图文广告设计中心</td>
										    <td>长沙县星沙街道封刀岭社区华润凤凰城三期22栋117号</td>
										    <td>15377480500</td>
										  </tr>
										  <tr >
										    <td >长沙品卓刻章有限公司</td>
										    <td>长沙县星沙街道松雅社区松雅小区B-10-627号</td>
										    <td>13973361361</td>
										  </tr>
										  <tr >
										    <td >湖南百顺印章有限公司</td>
										    <td>长沙县星沙街道东六路266号华润置地广场一期12栋706号</td>
										    <td>15387544777</td>
										  </tr>
										  <tr >
										    <td >长沙仁捷印章有限公司</td>
										    <td>长沙县星沙街道松雅安置区B-17栋655号</td>
										    <td>17673059656</td>
										  </tr>
										  <tr >
										    <td >长沙巧工印章有限公司</td>
										    <td>长沙县榔梨街道梨江路1号</td>
										    <td>13787224737</td>
										  </tr>
										  <tr >
										    <td >浏阳市张记防伪印章制作社</td>
										    <td>浏阳市劳动中路205号</td>
										    <td>15707490555</td>
										  </tr>
										  <tr >
										    <td >浏阳市九鼎防伪印章制作社</td>
										    <td>浏阳市劳动中路205号</td>
										    <td>13973193739</td>
										  </tr>
										  <tr >
										    <td >浏阳市升恒服务部</td>
										    <td>浏阳市劳动路210号</td>
										    <td>13677358033</td>
										  </tr>
										  <tr >
										    <td >浏阳市淮川方正印章制作社</td>
										    <td>浏阳市淮川劳动中路201号</td>
										    <td>13548562555</td>
										  </tr>
										  <tr >
										    <td >长沙市天工印章有限公司</td>
										    <td>玉潭镇春城路479号</td>
										    <td>13973136994</td>
										  </tr>
										  <tr >
										    <td >湖南省方正印章有限公司</td>
										    <td>城郊街道东沩社区东沩西路185号</td>
										    <td>13874864678</td>
										  </tr>
										  <tr >
										    <td >长沙熹正防伪印章有限公司</td>
										    <td>城郊街道东沩社区宁乡大道瑞景春天116号</td>
										    <td>13657311915</td>
										  </tr>
										  <tr >
										    <td >宁乡久正防伪印章有限公司</td>
										    <td>玉潭街道八一街道楚沩中路84号</td>
										    <td>15570870332</td>
										  </tr>
										  <tr >
										    <td >宁乡明胜刻章服务有限公司</td>
										    <td>玉潭街道朝阳巷（商贸中心20栋）108号</td>
										    <td>13142063828</td>
										  </tr>
										  <tr >
										    <td >长沙梵博防伪印章有限公司</td>
										    <td>玉潭街道楚沩社区一环北路世纪阳光F栋119号</td>
										    <td>15874221598</td>
										  </tr>
										  <tr >
										    <td >宁乡信朝印章有限公司</td>
										    <td>玉潭街道大玺门4栋103号</td>
										    <td>13874979199</td>
										  </tr>
										  <tr >
										    <td >长沙竟杰刻章服务有限公司</td>
										    <td>玉潭街道花明北路（凝香华都15A栋101号）</td>
										    <td>18007315518</td>
										  </tr>
										  <tr >
										    <td >宁乡楚韵印章有限责任公司</td>
										    <td>玉潭街道花明社区春城南路268号</td>
										    <td>13786138616</td>
										  </tr>
										  <tr >
										    <td >长沙大琢刻章服务有限公司</td>
										    <td>玉潭街道通益社区中央领域1栋109号</td>
										    <td>15974220938</td>
										  </tr>
										  <tr >
										    <td >宁乡智创防伪印章有限公司</td>
										    <td>玉潭街道香山社区商贸中心再就业商城20栋A101号</td>
										    <td>15575198688</td>
										  </tr>
										  <tr >
										    <td >宁乡宇博印章有限公司</td>
										    <td>玉潭街道新康社区绿地中央花园中轴104号</td>
										    <td>18874992417</td>
										  </tr>
										  <tr >
										    <td >长沙平章印章有限公司</td>
										    <td>玉潭通益社区花明北路339号富豪山庄盛翠豪庭15栋103号</td>
										    <td>13808499692</td>
										  </tr>
										  <tr >
										    <td >长沙禄吉达印章有限责任公司</td>
										    <td>东屯渡街道扬帆小区E28栋1单元2-1号</td>
										    <td>18274836424</td>
										  </tr>
										  <tr >
										    <td >长沙拓印印章有限公司</td>
										    <td>万家丽北路三段459号东门壹号A栋713房</td>
										    <td>18674851402</td>
										  </tr>
										  <tr >
										    <td >长沙市晶品雕刻有限公司第一分公司</td>
										    <td>荷花园教师村107房</td>
										    <td>13875854111</td>
										  </tr>
										  <tr >
										    <td >长沙福玺轩印章有限公司</td>
										    <td>朝阳街道解放东路218号房</td>
										    <td>13517492557</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区建华刻章服务部</td>
										    <td>中山路17号（原中山路11号）</td>
										    <td>13974988572</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区跃华雕刻工艺厂</td>
										    <td>蔡锷中路165号</td>
										    <td>13973124685</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区同飞标牌经营部</td>
										    <td>蔡锷中路149号</td>
										    <td>13517318309</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区正大印章经营部</td>
										    <td>解放西路119号</td>
										    <td>13017197585</td>
										  </tr>
										  <tr >
										    <td >长沙中平印章有限公司</td>
										    <td>解放东路22号</td>
										    <td>17752853258</td>
										  </tr>
										  <tr >
										    <td >长沙市宏达印章制作有限公司一分公司</td>
										    <td>蔡锷中路251号</td>
										    <td>15211031090</td>
										  </tr>
										  <tr >
										    <td >长沙伟浩印章有限公司</td>
										    <td>东屯渡街道高岭小区78栋12门41号</td>
										    <td>15073977896</td>
										  </tr>
										  <tr height="20">
										    <td height="20">长沙市杰鸿印章有限公司</td>
										    <td>张公岭街道东大门配套住宅2栋111号房</td>
										    <td>18229939525</td>
										  </tr>
										  <tr >
										    <td >长沙市正光印章有限公司</td>
										    <td>蔡锷中路169号</td>
										    <td>15874166618</td>
										  </tr>
										  <tr >
										    <td >湖南省鹿鑫防伪印章科技有限公司</td>
										    <td>远大路262号</td>
										    <td>13143058938</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区霞辉广告制作服务部</td>
										    <td>火星路新世纪家园D栋112号门面</td>
										    <td>13755158717</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区栾飞打字复印店</td>
										    <td>马王堆街道晚报大道392号门面</td>
										    <td>18670031856</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区康鹏雕刻工艺有限公司</td>
										    <td>新世纪家园D2栋-122门面</td>
										    <td>13874843872</td>
										  </tr>
										  <tr >
										    <td >长沙市芙蓉区振欣标牌雕刻厂</td>
										    <td>蔡锷中路135号</td>
										    <td>13875842423</td>
										  </tr>
										  <tr >
										    <td >长沙市海川印章有限公司</td>
										    <td>芙蓉中路二段30号</td>
										    <td>13387319998</td>
										  </tr>
										  <tr >
										    <td >长沙市晶品雕刻有限公司</td>
										    <td>人民中路529号</td>
										    <td>13908458251</td>
										  </tr>
										  <tr >
										    <td >湖南省方正防伪印章有限公司长沙分公司</td>
										    <td>蔡锷中路50号</td>
										    <td>13507436856</td>
										  </tr>
										  <tr >
										    <td >长沙印象印章有限公司</td>
										    <td>曙光北路73号</td>
										    <td>13873180317</td>
										  </tr>
										  <tr >
										    <td >长沙常盛印章有限公司</td>
										    <td>三湘湖大市场家电城A栋3楼14号</td>
										    <td>13807485291</td>
										  </tr>
										  <tr >
										    <td >长沙市湘意雕刻工艺有限公司</td>
										    <td>湖南省长沙市芙蓉区蔡锷中路253号</td>
										    <td>13142058938</td>
										  </tr>
										  <tr >
										    <td >浏阳市关口长欣打印服务部</td>
										    <td>浏阳市政务中心商务中心</td>
										    <td>13667316726</td>
										  </tr>
										  <tr >
										    <td >长沙印德美印章有限公司</td>
										    <td>长沙市芙蓉区东安街道东屯村八小区一栋</td>
										    <td>13787287822</td>
										  </tr>
										  <tr >
										    <td >长沙双盈印章有限公司</td>
										    <td>长沙市芙蓉区东屯渡街道怡人源小区北栋</td>
										    <td>15388069355</td>
										  </tr>
										  <tr >
										    <td >长沙市嘉豪文化用品有限公司</td>
										    <td>长沙市芙蓉区解放中路166号</td>
										    <td>15111037836</td>
										  </tr>
										  <tr >
										    <td >长沙市宏达印章制作有限公司</td>
										    <td>长沙市芙蓉区人民中路365号</td>
										    <td>13974884880</td>
										  </tr>
										  <tr >
										    <td >长沙湘君泽刻章服务有限公司</td>
										    <td>长沙市芙蓉区火星街道紫薇路171号紫来阁118房</td>
										    <td>15116456662</td>
										  </tr>
										  <tr >
										    <td >长沙志勤印章有限公司</td>
										    <td>长沙县星沙街道松雅小区B2栋615号</td>
										    <td>18163771190</td>
										  </tr>
										  <tr >
										    <td >长沙烙印印章有限公司</td>
										    <td>长沙县星沙街道凉塘路社区四区31栋167号</td>
										    <td>13574845566</td>
										  </tr>
										  <tr >
										    <td >长沙司洛印章有限公司</td>
										    <td>长沙县星沙街道望仙路山水人家小区D-27号门面</td>
										    <td>18932486682</td>
										  </tr>
										  <tr >
										    <td >湖南非凡图文广告有限公司</td>
										    <td>湖南省长沙县星沙街道板仓路345号</td>
										    <td>13054162588</td>
										  </tr>
										  <tr >
										    <td >长沙县追星印章雕刻有限公司</td>
										    <td>湖南省长沙县星沙街道松雅小区B10栋635号</td>
										    <td>15116120820</td>
										  </tr>
										  <tr >
										    <td >长沙智和印章有限公司</td>
										    <td>长沙县星沙街道开元路社区望仙路山水人家小区D-10号门面</td>
										    <td>18774855708</td>
										  </tr>
										  <tr >
										    <td >长沙逸凡印章雕刻有限公司</td>
										    <td>星沙街道星沙三区21栋（柏维广告）</td>
										    <td>18974928345</td>
										  </tr>
										  <tr >
										    <td >长沙县小唯刻章服务有限公司</td>
										    <td>湖南省长沙县星沙街道杉仙岭社区三区63栋395号</td>
										    <td>13657484342</td>
										  </tr>
										  <tr >
										    <td >长沙奋达印章有限公司</td>
										    <td>长沙县政务服务中心二楼北厅31号窗口</td>
										    <td>13016162715</td>
										  </tr>
										  <tr>
										    <td >长沙县信杰印章有限公司
										    </td>
										    <td>长沙县星沙街道牛角冲社区一区67栋420号101</td>
										    <td>15388000808</td>
										  </tr>
										  <tr >
										    <td >长沙方寸海纳印章有限公司</td>
										    <td>湖南省长沙县榔梨街道大园社区龙华路6号</td>
										    <td>13787417397</td>
										  </tr>
										  <tr >
										    <td >长沙慧中印章有限公司</td>
										    <td>长沙县星沙街道牛角冲社区板仓路53号</td>
										    <td>13055184177</td>
										  </tr>
										  <tr >
										    <td >浏阳科汇广告装饰有限公司</td>
										    <td>浏阳经济技术开发区健寿大道81号</td>
										    <td>13548791881</td>
										  </tr>
										  <tr >
										    <td >长沙市望城区智欣印章工作室</td>
										    <td>望城区大泽湖街道新港线集镇李芳私房</td>
										    <td>13574167545</td>
										  </tr>
										  <tr >
										    <td >长沙市邑发印章有限公司</td>
										    <td>长沙市高新区桐梓坡西路229号金泓园孵化大楼A101</td>
										    <td>18075197673</td>
										  </tr>
										  <tr >
										    <td >长沙乐意刻章有限公司</td>
										    <td>岳麓区望岳街道道坡小区B7栋107号</td>
										    <td>13973361361</td>
										  </tr>
										  <tr >
										    <td >长沙市岳麓区谭艳美印章店</td>
										    <td>岳麓区银盆岭街道桐梓坡501号</td>
										    <td>13667334376</td>
										  </tr>
										  <tr >
										    <td >长沙湘御刻章服务有限公司</td>
										    <td>岳麓区天顶街道清水社区枫林三路341号</td>
										    <td>15084817765</td>
										  </tr>
										  <tr >
										    <td >长沙市智新印章有限公司</td>
										    <td>长沙市天心区涂家冲35栋104号</td>
										    <td>13467312122</td>
										  </tr>
										  <tr>
										    <td>长沙章吉印章有限公司</td>
										    <td>湖南省长沙市天心区湘府路鑫远湘府东苑一期1号栋101号-A房</td>
										    <td>13787282087</td>
										  </tr>
										  <tr >
										    <td >湖南八鼎网络电子印章有限公司</td>
										    <td>长沙市天心区裕龙街001号</td>
										    <td>18670031856</td>
										  </tr>
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<div class="dh">
								<span class="dh-title">税务发票</span>
							</div>
							<div class="dh-title-content">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;税务发票，是指在购销商品、提供或者接受服务以及从事其他经营活动中，开具、收取的收付款凭证。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;税务机关是发票的主管机关，负责发票印制、领购、开具、取得、保管、缴销的管理和监督。单位、个人在购销商品、提供或者接受经营服务以及从事其他经营活动中，应当按照规定开具、使用、取得发票。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发票专用章是指用票单位和个人在其开具发票时加盖的有其名称、税务登记号、发票专用章字样的印章。<br>
							</div>
						</div>
					</div>
					<div class="common_width" v-show="tabs[2].isSelected">
						<!-- <div align="center">
							<img style="width: 15%;margin-top: 100px;margin-bottom: 15px;" alt="" src="./imgs/scjg/zt/none.png">
							<br>
							<span style="color: #d1d1d1;">内容正在梳理中...</span>
						</div> -->
						<div>
							<div class="dh">
								<span class="dh-title">事项名称</span>
							</div>
							<div class="dh-title-content">
								我要开办企业
							</div> 
							<div class="dh">
								<span class="dh-title">办理依据</span>
							</div>
							<div class="dh-title-content">
								<el-link target="_blank">1.&nbsp;&nbsp;《中华人民共和国公司法》；</el-link><br>
								<el-link target="_blank">2.&nbsp;&nbsp;《中华人民共和国公司登记管理条例》；</el-link><br>
								<el-link target="_blank">3.&nbsp;&nbsp;《中华人民共和国合伙企业法》；</el-link><br>
								<el-link target="_blank">4.&nbsp;&nbsp;《中华人民共和国合伙企业登记管理办法》；</el-link><br>
								<el-link target="_blank">5.&nbsp;&nbsp;《中华人民共和国个人独资企业法》；</el-link><br>
								<el-link target="_blank">6.&nbsp;&nbsp;《个人独资企业登记管理办法》；</el-link><br>
								<el-link target="_blank">7.&nbsp;&nbsp;《中华人民共和国外资企业法》；</el-link><br>
								<el-link target="_blank">8.&nbsp;&nbsp;《中华人民共和国中外合资经营企业法》；</el-link><br>
								<el-link target="_blank">9.&nbsp;&nbsp;《中华人民共和国中外合作经营企业法》；</el-link><br>
								<el-link target="_blank">10.&nbsp;&nbsp;《中华人民共和国行政许可法》；</el-link><br>
								<el-link target="_blank">11.&nbsp;&nbsp;《中华人民共和国企业法人登记管理管理条例》；</el-link><br>
								<el-link target="_blank">12.&nbsp;&nbsp;《中华人民共和国企业法人登记管理管理条例施行细则》；</el-link><br>
								<el-link target="_blank">13.&nbsp;&nbsp;《企业登记程序规定》；</el-link><br>
								<el-link target="_blank">14.&nbsp;&nbsp;《外商投资准入特别管理措施（负面清单）（2018年版）》；</el-link><br>
								<el-link target="_blank">15.&nbsp;&nbsp;《市场监管总局关于印发<企业登记申请文书规范><企业登记提交材料规范>的通知》；</el-link><br>
								<el-link target="_blank">16.&nbsp;&nbsp;《湖南省人民政府办公厅关于推进“多证合一”改革的实施意见》。</el-link>
							</div>
							<div class="dh">
								<span class="dh-title">办理条件</span>
							</div>
							<div class="dh-title-content">
								●&nbsp;&nbsp;向湖南省市场监督管理局申请设立有限公司（股份有限公司），应当具备下列条件之一：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;&nbsp;省人民政府国有资产监督管理机构履行出资人职责的公司以及该公司投资设立并持有50%以上股份的公司；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;&nbsp;自然人及自然人投资的公司投资注册资本在5000万元以上且有省属国有独资公司或其全资（含控股）子公司参股，其住所在长沙市城区申请在湖南省市场监督管理局登记注册的公司；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.&nbsp;&nbsp;冠省名称、住所在长沙市城区且申请在湖南省市场监督管理局登记注册的上市股份有限公司和在全国中小企业股份转让系统挂牌交易的股份有限公司；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.&nbsp;&nbsp;国家市场监督管理总局授权湖南省市场监督管理局登记或者湖南省市场监督管理局认为确有必要由湖南省市场监督管理局登记的企业（含私营企业）。<br>
								●&nbsp;&nbsp;向湖南省市场监督管理局申请非公司企业法人开业登记，应当具备下列条件之一：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;&nbsp;省政府各委、办、厅、局履行出资人职责设立，并持有50%以上股份设立在长沙市城区的公司或作为主管部门（出资人）设立在长沙市城区的非公司制企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;&nbsp;省属事业单位、科技型社会团体投资设立，并持有50%以上股份设立在长沙市城区的公司或作为主管部门（出资人）设立在长沙市城区的非公司制企业；<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.&nbsp;&nbsp;依照法律、行政法规、国务院决定和行政规章的规定，应当由湖南省市场监督管理局登记的公司及非公司制企业。<br>
								●&nbsp;&nbsp;向湖南省市场监督管理局申请设立非公司营业单位、非法人分支机构，应当具备下列条件之一：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;&nbsp;国家市场监督管理总局根据有关规定核转的营业单位、非法人分支机构;<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;&nbsp;在湖南省范围内从事煤炭开采的营业单位、非法人分支机构。<br>
								●&nbsp;&nbsp;向湖南省市场监督管理局申请个人独资企业、合伙企业及其分支机构的仅限在湖南省范围内从事煤炭开采的企业。
							</div>
							<div class="dh">
								<span class="dh-title">申请材料</span>
							</div>
							<div class="dh-title-content">
								<h4>公司设立登记提交材料规范</h4>
								1.&nbsp;&nbsp;《公司登记（备案）申请书》。<br>
								2.&nbsp;&nbsp;公司章程（有限责任公司由全体股东签署，股份有限公司由全体发起人签署）。<br>
								3.&nbsp;&nbsp;股东、发起人的主体资格证明或自然人身份证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 股东、发起人为企业的，提交营业执照复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 股东、发起人为事业法人的，提交事业法人登记证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 股东、发起人为社团法人的，提交社团法人登记证复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 股东、发起人为民办非企业单位的，提交民办非企业单位证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 股东、发起人为自然人的，提交身份证件复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 其他股东、发起人的,提交有关法律法规规定的资格证明复印件。<br>
								4.&nbsp;&nbsp;法定代表人、董事、监事和经理的任职文件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆根据《公司法》和公司章程的规定，有限责任公司提交股东决定或股东会决议，发起设立的股份有限公司提交股东大会会议记录(募集设立的股份有限公司提交创立大会会议记录)。对《公司法》和章程规定公司组织机构人员任职须经董事会、监事会等形式产生的，还需提交董事签字的董事会决议、监事签字的监事会决议等相关材料。<br>
								5.&nbsp;&nbsp;住所使用证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆属于自有房产的，提交房屋产权证明；属于自有房产但未取得房屋产权证明的，提交县（市、区）政府房产管理部门、乡镇人民政府（街道办事处）、各类经济功能区管委会（如经济技术开发区、工业园区、科技园区管委会）或者居（村）委会等机构出具的场所证明。场所证明内容须包含场所的具体地址、权属主体以及出具机构同意该场所用于经营用途的意见。购买的商品房未取得房屋产权证明的，提交购房合同复印件及建筑工程竣工验收合格证明材料复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆租赁（借用）房屋作为住所（经营场所）登记的，提交租赁（借用）合同和房屋权属证明。租赁（借用）宾馆、饭店（酒店）作为住所（经营场所）的，提交租赁（借用）合同和宾馆、饭店（酒店）营业执照复印件。租赁市场铺位作为住所（经营场所）的，提交铺位租赁合同和市场企业营业执照复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆将住宅改变为经营性用房，属城镇房屋的，应提交住所（经营场所）所在地居民委员会或业主委员会出具的有利害关系的业主同意将住宅改变为经营性用房的证明文件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆对利用住宅从事电子商务、设计策划、文化创意、软件开发、信息服务、管理咨询等不存在安全隐患、环境污染、影响居民正常生活秩序和身体健康、生命财产安全的市场主体，办理注册登记时，可免予提交业主委员会或者居民（村民）委员会出具的相关证明材料，申请人应提交包括遵守相关法律规定，遵守公序良俗，若存在污染、扰民等情形，主动消除不良影响，并办理住所变更登记的承诺。<br>
								6.&nbsp;&nbsp;募集设立的股份有限公司提交依法设立的验资机构出具的验资证明。涉及发起人首次出资是非货币财产的，提交已办理财产权转移手续的证明文件。<br>
								7.&nbsp;&nbsp;募集设立的股份有限公司公开发行股票的应提交国务院证券监督管理机构的核准文件。<br>
								8.&nbsp;&nbsp;法律、行政法规和国务院决定规定设立公司必须报经批准的或公司申请登记的经营范围中有法律、行政法规和国务院决定规定必须在登记前报经批准的项目，提交有关批准文件或者许可证件的复印件。<br>
								注：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《公司法》、《公司登记管理条例》设立的有限责任公司(含一人有限责任公司和国有独资公司)、股份有限公司适用本规范。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提交的登记申请文书与其它申请材料应当使用A4型纸。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于现场窗口提交材料的：未注明提交复印件的，应当提交原件；提交复印件的，应当注明“与原件一致”并由申请人签署，或者由其指定的代表或委托的代理人加盖公章或签字。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对通过全程电子化方式申请登记注册的，申请人无需提交申请材料的纸质原件或复印件。提交主体资格证明、身份证明、批准证书、章程、决议等文件的，可通过全程电子化登记系统提交原件影像（印）件或通过系统设置的申请文书格式规范生成。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提交材料涉及签署，未注明签署人的，自然人由本人签字，法人和其他组织由法定代表人或者负责人签字，并加盖公章。
								<h4>非公司企业法人开业登记提交材料规范</h4>
								1.&nbsp;&nbsp;《非公司企业法人登记(备案）申请书》。<br>
								2.&nbsp;&nbsp;企业法人组织章程（主管部门（出资人）加盖公章）。<br>
								3.&nbsp;&nbsp;主管部门（出资人）的主体资格证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为企业的，提交营业执照复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为事业法人的，提交事业法人登记证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为社团法人的，提交社团法人登记证复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为民办非企业单位的，提交民办非企业单位证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 其他主管部门（出资人）的,提交有关法律法规规定的资格证明复印件。<br>
								4.&nbsp;&nbsp;主管部门（出资人）的出资证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为国有企业或者事业法人的，提交国有资产管理部门出具的国有资产产权登记证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为集体所有制企业或者社团组织、民办非企业单位的，提交依法设立的验资机构出具的验资证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 主管部门（出资人）为工会的，由上一级工会出具证明。<br>
								5.&nbsp;&nbsp;企业法定代表人的任职文件。<br>
								6.&nbsp;&nbsp;住所使用证明。<br>
								7.&nbsp;&nbsp;法律、行政法规规定设立企业必须报经批准的或企业申请登记的经营范围中有法律、行政法规和国务院决定规定必须在登记前报经批准的项目，提交有关的批准文件或者许可证件复印件。<br>
								注：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《企业法人登记管理条例》设立的企业法人申请开业登记适用本规范。
								<h4>营业单位、非法人分支机构开业登记提交材料规范</h4>
								1.&nbsp;&nbsp;《分公司、非法人分支机构、营业单位登记（备案）申请书》。<br>
								2.&nbsp;&nbsp;主管部门（出资人）主体资格证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆主管部门（出资人）为企业的，提交营业执照复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆主管部门（出资人）为事业法人的，提交事业法人登记证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆主管部门（出资人）为社团法人的，提交社团法人登记证复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆主管部门（出资人）为民办非企业单位的，提交民办非企业单位证书复印件。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆其他主管部门（出资人）的,提交有关法律法规规定的资格证明复印件。<br>
								3.&nbsp;&nbsp;地址的使用证明。<br>
								4.&nbsp;&nbsp;营业单位、非法人分支机构负责人的任职文件及身份证件复印件（在申请书中粘贴身份证复印件和签署确认任职信息即可)。<br>
								5.&nbsp;&nbsp;主管部门（出资人）或企业法人出具的资金数额证明。<br>
								6.&nbsp;&nbsp;企业法人营业执照复印件。（仅限非法人分支机构提供）<br>
								7.&nbsp;&nbsp;法律、行政法规和国务院决定规定设立营业单位、非法人分支机构必须报经批准的或营业单位、非法人分支机构经营范围涉及法律、行政法规和国务院决定规定登记前必须报经审批项目的,提交有关的批准文件或者许可证书复印件。<br>
								 注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《企业法人登记管理条例施行细则》设立的不具备企业法人条件的联营企业、其他从事经营活动的单位或企业法人申请设立的、不能独立承担民事责任的分支机构申请开业登记领取《营业执照》适用本规范。<br>
								<h4>合伙企业设立登记提交材料规范</h4>	
								1.&nbsp;&nbsp;《合伙企业登记（备案）申请书》。 <br>
								2.&nbsp;&nbsp;全体合伙人的主体资格证明。  <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 合伙人为企业的，提交营业执照副本复印件。 <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 合伙人为事业法人的，提交事业法人登记证书复印件。 <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 合伙人为社团法人的，提交社团法人登记证复印件。 <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 合伙人为民办非企业单位的，提交民办非企业单位证书复印件。 <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 合伙人为自然人的，提交身份证件复印件。 <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆ 其他合伙人提交有关法律法规规定的资格证明。 <br>
								3.&nbsp;&nbsp;全体合伙人签署的合伙协议。 <br>
								4.&nbsp;&nbsp;全体合伙人对各合伙人认缴或者实际缴付出资的确认书。（以非货币形式出资的，应载明全体合伙人协商作价出资情况或提交经全体合伙人委托的法定评估机构出具的评估作价证明）。 <br>
								5.&nbsp;&nbsp;主要经营场所使用证明。 <br>
								6.&nbsp;&nbsp;法律、行政法规和国务院决定规定在登记前须报经批准的或申请登记的经营范围中有法律、行政法规和国务院决定规定须在登记前报经批准的项目，提交有关批准文件或者许可证件的复印件。 <br>
								7.&nbsp;&nbsp;法律、行政法规规定设立特殊的普通合伙企业需要提交合伙人的职业资格证明的，提交相应证明。 <br>
								 注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《合伙企业法》、《合伙企业登记管理办法》设立的合伙企业适用本规范。
								<h4>合伙企业分支机构设立登记提交材料规范</h4>
								1.&nbsp;&nbsp;《分公司、非法人分支机构、营业单位登记（备案）申请书》。  <br>  
								2.&nbsp;&nbsp;全体合伙人签署的设立分支机构的决定书。 <br>
								3.&nbsp;&nbsp;经营场所使用证明。 <br>
								4.&nbsp;&nbsp;全体合伙人委派执行分支机构事务负责人的委托书和其身份证明复印件（在申请书中粘贴身份证复印件和签署委派信息即可)。 <br>
								5．&nbsp;&nbsp;法律、行政法规和国务院决定规定在登记前须报经批准的或申请登记的经营范围中有法律、行政法规和国务院决定规定须在登记前报经批准的项目，提交有关批准文件或者许可证件的复印件。 <br>
								6.&nbsp;&nbsp;合伙企业营业执照复印件。 <br>
								注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《合伙企业法》、《合伙企业登记管理办法》设立的合伙企业分支机构适用本规范。
								<h4>个人独资企业设立登记提交材料规范</h4>	
								1.&nbsp;&nbsp;《个人独资企业登记（备案）申请书》。 <br>
								2.&nbsp;&nbsp;投资人身份证件复印件（在申请书中粘贴身份证复印件即可)。   <br>
								3.&nbsp;&nbsp;企业住所使用证明。 <br>
								4.&nbsp;&nbsp;从事法律、行政法规规定必须报经有关部门审批的业务的，提交有关批准文件复印件。  <br>  
								注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《个人独资企业法》、《个人独资企业登记管理办法》设立的个人独资企业适用本规范。
								<h4>个人独资企业分支机构设立登记提交材料规范</h4>			
								1.&nbsp;&nbsp;《分公司、非法人分支机构、营业单位登记（备案）申请书》。 <br>
								2.&nbsp;&nbsp;经营场所使用证明。 <br>
								3.&nbsp;&nbsp;投资人委派分支机构负责人的委托书及身份证件复印件（在申请书中粘贴身份证复印件和签署委派信息即可)。 <br>
								4.&nbsp;&nbsp;从事法律、行政法规规定必须报经有关部门审批的业务的，提交有关批准文件复印件。 <br>
								5.&nbsp;&nbsp;个人独资企业营业执照复印件。 <br>
								注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《个人独资企业法》、《个人独资企业登记管理办法》设立的个人独资企业适用本规范。 <br>
								<h4>外商投资企业设立登记提交材料规范</h4>
								1.&nbsp;&nbsp;《公司登记（备案）申请书》（外商投资的公司填写）/《非公司外资企业登记（备案）申请书》（非公司外商投资企业填写）。 <br>
								2.&nbsp;&nbsp;公司章程、合同（合同仅限于依照《外资企业法》、《中外合作经营企业法》等法规申请设立的非公司外商投资企业提供）。公司章程、合同需投资各方法定代表人或其授权人签字、各投资方盖章的原件，投资者为自然人的由本人签字。涉及外商投资准入特别管理措施的企业应提交审批部门审批后的公司章程、合同。 <br>
								3.&nbsp;&nbsp;投资者的主体资格证明或自然人身份证明。中方投资者应提交由本单位加盖公章的营业执照/事业单位法人登记证书/社会团体法人登记证/民办非企业单位证书复印件作为主体资格证明；外国投资者的主体资格证明或身份证明应经其本国主管机关公证后送我国驻该国使（领）馆认证。如其本国与我国没有外交关系，则应当经与我国有外交关系的第三国驻该国使（领）馆认证，再由我国驻该第三国使（领）馆认证。某些国家的海外属地出具的文书，应先在该属地办妥公证，再经该国外交机构认证，最后由我国驻该国使（领）馆认证。香港、澳门和台湾地区投资者的主体资格证明或身份证明应当按照专项规定或协议依法提供当地公证机构的公证文件。 <br>
								4.&nbsp;&nbsp;法定代表人、董事/联合管理委员会委员、监事和经理的任职文件及身份证明复印件（外商投资的公司提交董事的任职文件，非公司外商投资企业提交董事或者联合管理委员会委员的任职文件）。 <br>
								5.&nbsp;&nbsp;住所（经营场所）合法使用证明。 <br>
								6.&nbsp;&nbsp;发起设立的股份有限公司提交股东大会会议记录，募集设立的股份有限公司提交创立大会的会议记录。（可以与第4项合并提交） <br>
								7.&nbsp;&nbsp;募集方式设立的股份有限公司公开发行股票的，提交国务院证券监督管理机构的核准文件原件或有效复印件。 <br>
								8.&nbsp;&nbsp;外国投资者的资信证明（仅限于非公司外商投资企业提供）。即资本信用证明书，由与该外国投资者有业务往来的金融机构出具。 <br>
								9.&nbsp;&nbsp;审批机关的批准文件（批复和批准证书副本1）（仅限于涉及外商投资准入特别管理措施的企业提供）。 <br>
								10.&nbsp;&nbsp;批准文件或者许可证件的复印件（仅限于申请登记的经营范围中有法律、行政法规和国务院决定规定必须在登记前报经批准的项目的企业提供）。 <br>
								注： <br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依照《公司法》、《中外合资经营企业法》、《外资企业法》、《中外合作经营企业法》等法规，申请设立外商投资有限责任公司、外商投资股份有限公司和非公司外商投资企业适用本规范。
								<h4>外商投资企业分支机构设立登记提交材料规范</h4>	
								1.&nbsp;&nbsp;《合伙企业登记（备案）申请书》。<br>
								2.&nbsp;&nbsp;住所（经营场所）合法使用证明。<br>
								3.&nbsp;&nbsp;全体合伙人的主体资格证明或自然人身份证明和住所证明。<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其中中方合伙人是自然人的，应当提交身份证件复印件；中方合伙人是法人或者其他组织的，应提交由本单位加盖公章的营业执照/事业单位法人登记证书/社会团体法人登记证/民办非企业单位证书复印件作为主体资格证明；外国合伙人的主体资格证明或自然人身份证件和境外住所证明应经其本国主管机关公证后送我国驻该国使（领）馆认证。如其本国与我国没有外交关系，则应当经与我国有外交关系的第三国驻该国使（领）馆认证，再由我国驻该第三国使（领）馆认证。某些国家的海外属地出具的文书，应先在该属地办妥公证，再经该国外交机构认证，最后由我国驻该国使（领）馆认证。香港、澳门和台湾地区合伙人的主体资格证明或身份证明和境外住所证明应当按照专项规定或协议依法提供当地公证机构的公证文件。外国合伙人在国内有住所的，可以提交国内住所证明，无需公证认证。<br>
								4.&nbsp;&nbsp;全体合伙人对各合伙人认缴或实缴出资的确认书。合伙人以实物、知识产权、土地使用权或者其他财产权利出资，经全体合伙人协商作价的，应当向企业登记机关提交全体合伙人签署的协商作价确认书；由全体合伙人委托法定评估机构评估作价的，应当向企业登记机关提交中国境内的法定评估机构出具的评估作价证明。外国普通合伙人以劳务出资的，应当向企业登记机关提交外国人就业许可证。<br>
								5.&nbsp;&nbsp;资信证明。即资本信用证明书，仅适用于外国合伙人为普通合伙人的情形，由与该外国合伙人有业务往来的金融机构出具。<br>
								6.&nbsp;&nbsp;全体合伙人签署的合伙协议。<br>
								7.&nbsp;&nbsp;全体合伙人签署的符合外商投资产业政策的说明。全体合伙人签署的符合外商投资产业政策的说明应当列明其经营范围，并说明其中每个项目属于《外商投资产业指导目录》的项目名称及类别。<br>
								8.&nbsp;&nbsp;法律、行政法规规定设立特殊的普通合伙企业需要提交合伙人的职业资格证明的，提交相应证明。仅适用于法律、行政法规或国务院规定的以专业知识和专门技能为客户提供有偿服务的专业服务机构，设立为特殊的普通合伙企业的情形。<br>
								9.&nbsp;&nbsp;前置审批文件或证件。指有关前置许可的批准文件或者许可证书复印件或许可证明，适用于外商投资合伙企业的经营范围中有法律、行政法规和国务院规定在登记前须经批准行业的。<br>
								注：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国合伙企业法》、《中华人民共和国合伙企业登记管理办法》以及《中华人民共和国外国企业或者个人在中国境内设立合伙企业管理办法》等法律法规申请设立外商投资合伙企业适用本规范。
								<h4>外商投资合伙企业分支机构设立登记提交材料规范</h4>
								1.&nbsp;&nbsp;《分公司、非法人分支机构、营业单位登记（备案）申请书》。<br>
								2.&nbsp;&nbsp;全体合伙人签署的设立分支机构的决定书，指根据《中华人民共和国合伙企业法》、《中华人民共和国合伙企业登记管理办法》以及《中华人民共和国外国企业或者个人在中国境内设立合伙企业管理办法》规定以及合伙企业协议作出的决定书，决定书的内容与所申请的事项应当一致。<br>
								3.&nbsp;&nbsp;住所（经营场所）合法使用证明。<br>
								4.&nbsp;&nbsp;前置审批文件或证件，指有关前置许可的批准文件或者许可证书复印件或许可证明，适用于经营范围中有法律、行政法规和国务院规定必须在登记前报经批准的项目的外商投资合伙企业。<br>
								5.&nbsp;&nbsp;隶属合伙企业营业执照复印件（加盖合伙企业印章）。<br>
								注：<br>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国合伙企业法》、《中华人民共和国合伙企业登记管理办法》以及《中华人民共和国外国企业或者个人在中国境内设立合伙企业管理办法》等法律法规设立的外商投资合伙企业申请设立分支机构适用本规范。
								<div class="dh">
									<span class="dh-title">审批决定机构</span>
								</div>
								<div class="dh-title-content">
									市场监管部门。
								</div>
								<div class="dh">
									<span class="dh-title">审批时限</span>
								</div>
								<div class="dh-title-content">
									开办企业至受理之日起2个工作日。
								</div>
								<div class="dh">
									<span class="dh-title">收费依据及标准</span>
								</div>
								<div class="dh-title-content">
									不收费
								</div>
								<div class="dh">
									<span class="dh-title">办公地点和时间</span>
								</div>
								<div class="dh-title-content">
									长沙市天心区芙蓉南路二段118号湖南省市场监督管理局政务服务大厅<br>
									周一至周五（法定节假日和周五下午除外）<br>
									上午：8：00—12：00<br>
									下午：2：30— 5：30  （7—9月为3:00—6:00）
								</div>
								<div class="dh">
									<span class="dh-title">咨询电话</span>
								</div>
								<div class="dh-title-content">
									企业登记业务咨询：0731-85693039
								</div>
							</div>
						</div>
					</div>
					<div class="common_width" v-show="tabs[3].isSelected">
						<div>
							<div class="dh">
								<span class="dh-title">申请方式</span>
							</div>
							<div class="dh-title-content">
								（一）网上申请方式：申请人登录湖南政务服务网（http://zwfw-new.hunan.gov.cn/）-“部门服务”-“省市场监督管理局”相应服务事项栏目“在线办理”申请办理。<br>
								（二）现场申请方式：申请人携带申请资料前往湖南省市场监督管理局办事大厅现场办理，地址湖南省长沙市芙蓉南路二段118号湖南省市场监督管理局办公大楼一楼办事大厅受理窗口：咨询电话：0731-85693100。<br>
							</div>
						</div>
					</div>
					<div class="common_width" v-show="tabs[4].isSelected">
						<div>
							<div class="dh">
								<span class="dh-title">相关政策</span>
							</div>
							<div class="dh-title-content">
								<el-link target="_blank">(1)《中华人民共和国公司法》；</el-link><br>
								<el-link target="_blank">(2)《中华人民共和国公司登记管理条例》；</el-link><br>
								<el-link target="_blank">(3)《中华人民共和国合伙企业法》；</el-link><br>
								<el-link target="_blank">(4)《中华人民共和国合伙企业登记管理办法》；</el-link><br>
								<el-link target="_blank">(5)《中华人民共和国个人独资企业法》；</el-link><br>
								<el-link target="_blank">(6)《个人独资企业登记管理办法》；</el-link><br>
								<el-link target="_blank">(7)《中华人民共和国外资企业法》；</el-link><br>
								<el-link target="_blank">(8)《中华人民共和国中外合资经营企业法》；</el-link><br>
								<el-link target="_blank">(9)《中华人民共和国中外合作经营企业法》；</el-link><br>
								<el-link target="_blank">(10)《中华人民共和国企业法人登记管理管理条例》；</el-link><br>
								<el-link target="_blank">(11)《中华人民共和国企业法人登记管理管理条例施行细则》；</el-link><br>
								<el-link target="_blank">(12)《企业登记程序规定》；</el-link><br>
								<el-link target="_blank">(13)《外商投资准入特别管理措施（负面清单）（2018年版）》；</el-link><br>
								<el-link target="_blank">(14)《湖南省人民政府办公厅关于推进“多证合一”改革的实施意见》。</el-link><br>
								<el-link target="_blank">(15)《印章业治安管理条例》</el-link><br>
								<el-link target="_blank">(16)《中华人民共和国税收征收管理法》</el-link><br>
								<el-link target="_blank">(17)《中华人民共和国税收征收管理法实施细则》</el-link><br>
								<el-link target="_blank">(18)《税务登记管理办法》</el-link><br>
								<el-link target="_blank">(19)《国家税务总局关于推进工商营业执照、组织机构代码证和税务登记证“三证合一”改革的若干意见》</el-link><br>
								<el-link target="_blank">(20)《国家工商行政管理总局关于推进全国统一“多证合一”改革的意见》</el-link>
							</div>
						</div>
					</div>
					<div class="common_width" v-show="tabs[5].isSelected">
						<div class="dh">
							<span class="dh-title">常见问题</span>
						</div>
						<div class="dh-title-content">
							<i class="ask_explain_i el-icon-question"></i><span class="ask">申请表格和提交材料中的相关人员签名问题</span><br>
							<span class="answer">申请表格和提交材料中的相关人员签名必须由相关人员本人亲笔签名，不得由他人代签。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">申请人提交材料原件、复印件的有关问题</span><br>
							<span class="answer">申请人应按照要求提供材料原件、复印件，已经注明需提供原件的，提供复印件无效。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">申请人提交材料真实性的有关问题</span><br>
							<span class="answer">申请人提交的材料必须真实、有效，提交虚假材料或者采取其他欺诈手段隐瞒重要事实，取得登记的，由登记机关依照相关法律法规予以处罚。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">申请人填写纸质材料的有关问题</span><br>
							<span class="answer">申请人提交的申请书应当使用A4型纸。依表格打印生成的，使用黑色钢笔或签字笔签署；手工填写的，使用黑色钢笔或签字笔工整填写、签署。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">什么是新办纳税人套餐式服务？</span><br>
							<span class="answer">按照《国家税务总局关于进一步深化税务系统“放管服”改革优化税收环境的若干意见》（税总发[2017]101）要求，推行新办纳税人“套餐式”服务，纳税人可通过该服务一次性办结多个并联涉税事项。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务包含哪些涉税事项</span><br>
							<span class="answer">套餐式服务包含的涉税事项有：登记信息确认、财务会计制度及核算软件备案报告、存款账户账号报告、增值税一般纳税人登记、发票票种核定、增值税专用发票最高开票限额申请、增值税税控系统专用设备申请及初始发行、发票领用、湖南省网上税务局开户和实名认证10个涉税事项，纳税人可根据自己的实际需要自行选择申请。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务申请多久可以办结</span><br>
							<span class="answer">套餐式服务所涉及的涉税事项申请均属于即办事项，数据准确且提交资料符合规定的，原则上一天之内予以办结。纳税人可通过网上税务局套餐式服务申请随时查看税务机关办理进度与反馈信息，待全部完结后携带相关资料到主管税务机关前台办理实名认证等业务。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人在进行身份验证时出现异常的要怎么解决</span><br>
							<span class="answer">新办单位纳税人在首次登录进行身份验证时，出现验证异常有以下几种情况：
								1.系统提示“您已设置密码，请在页面选择再次登录访问。”，这种情况直接在[再次登录]界面录入统一社会信用代码、法人代表身份证号码、密码登录即可；
								2.系统提示“您已在税务机关进行登记信息确认，不适用本模块。”，这种情况说明纳税人已在税务机关进行登记信息确认，如果需要申请其他涉税事项应通过登录湖南省网上税务局办理；
								3.验证查询没带出法人代表相关信息录入栏次的，这种情况说明未检索到符合条件的工商共享信息，可能是工商信息接口不稳定，工商信息传递延迟，请您稍后再做尝试。
							</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务申请适用哪些纳税人</span><br>
							<span class="answer">套餐式服务申请适用于已办理工商营业执照取得统一社会信用代码的新办单位纳税人使用，以下几种情形不适用：
								1.个体工商户或其他机关批准成立的纳税人暂不适用本业务模块。
								2.单位法定代表人在税务部门存在非正常户信息的暂不适用本业务模块。
								3.已在税务机关前台进行信息登记的纳税人暂不适用本业务模块。
							</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">办理新办纳税人套餐式服务申请的登记信息确认时，工商信息没有带出或者错误的要怎么解决</span><br>
							<span class="answer">网上税务局实现外部数据共享，进行登记信息确认时可自动获取工商的登记信息。属于应由工商信息自动带出且网上税务局不能修改的，若带出为空或不正确的，请前往工商部门核对数据后再重新办理；属于应由工商信息自动带出但可以进行网上税务局修改的，若带出为空或不正确的，可由纳税人根据实际情况进行修改填报。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">办理新办纳税人套餐式服务申请的存款账户账号报告时，提示逾期是什么意思</span><br>
							<span class="answer">按照《中华人民共和国税收征收管理法实施细则》第十七条规定，从事生产、经营的纳税人应当自开立基本存款账户或其他存款账户之日起15日内，向主管税务机关书面报告其全部账号；发生变化的，应当自变化之日起15日内，向主管税务机关书面报告。所以，如果纳税人提交的存款账户账号报告超过发证日期15日，则涉及逾期办理，网上税务局不支持须到主管税务机关前台办理。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">为什么发票领用中找不到已经核定的发票种类</span><br>
							<span class="answer">目前网上税务局支持领用的发票种类为升级版的增值税专用发票和增值税普通发票，其他发票种类的领用需到办税服务厅办理。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务申请中的发票领用支持邮寄功能吗</span><br>
							<span class="answer">目前新办纳税人套餐式服务申请中的发票领用暂只支持“办税厅自取”的方式，即纳税人通过网上税务局提交发票领用的申请，税务机关核准后发票出柜，待纳税人到前台领取。纳税人需要到主管税务机关办理实名认证后方可领取。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务申请中的增值税税控系统专用设备申请及初始发行是什么</span><br>
							<span class="answer">因网上税务局发票领用目前只支持升级版的增值税专用发票和增值税普通发票的领用申请，所以为方便新办纳税人一次性办理发票申领业务，增加了税控系统专用设备申请及初始发行业务的办理。新办纳税人可以通过该业务选择第三方服务商，通过网上办理税控系统专用设备的购买，由服务商将专用设备带至税务机关进行初始发行。</span><br>
							<i class="ask_explain_i el-icon-question"></i><span class="ask">新办纳税人套餐式服务申请中的实名认证如何办理</span><br>
							<span class="answer">实名认证需先对纳税人的法人代表认证才能对其他相关人员进行认证，而法人认证须到主管税务机关前台办理。所以，目前套餐式服务申请中的实名认证暂只支持实名表单的填报与打印功能，方便纳税人携带表单到主管税务机关前台快速办理实名认证，节省前台填报表单时间。</span><br>
						</div>
					</div>
				</el-main>
				<el-footer style="padding: 0px;margin-top: 20px;">
					<div class="bottom">
						<div style="width: 70%;margin: 0 auto;">
							<el-row :gutter="20">
								<el-col :span="3">
									<div class="">
										<img alt="" src="./imgs/scjg/scju_red.png">
									</div>
								</el-col>
								<el-col :span="8">
									<div class="">
										<span>版权所有：湖南省市场监督管理局</span><br>
										<span>地 址：湖南省长沙市芙蓉南路二段118号</span>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="">
										<span>邮 编：410004</span><br>
										<span>电 话：0731-8569300</span>
									</div>
								</el-col>
								<el-col :span="7">
									<div class="">
										<span>公安机关备案号：43010302000524</span><br>
										<span>网站标识码：4300000077</span>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-footer>
			</el-container>
		</div>
	</body>
	<script src="js/interpret.js"></script>
</html>
