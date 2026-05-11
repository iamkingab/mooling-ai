     1|<template>
     2|  <div class="dashboard-container">
     3|    <!-- 侧边栏 -->
     4|    <div class="sidebar" :class="{ 'collapsed': isCollapse }">
     5|      <div class="logo">
     6|        <h2>📚 墨灵</h2>
     7|      </div>
     8|      
     9|      <el-menu
    10|        :default-active="activeMenu"
    11|        class="sidebar-menu"
    12|        @select="handleMenuSelect"
    13|        :collapse="isCollapse"
    14|        :collapse-transition="false"
    15|      >
    16|        <el-menu-item index="/">
    17|          <el-icon><House /></el-icon>
    18|          <template #title>首页</template>
    19|        </el-menu-item>
    20|        
    21|        <el-menu-item index="/novels">
    22|          <el-icon><Document /></el-icon>
    23|          <template #title>小说列表</template>
    24|        </el-menu-item>
    25|        
    26|        <el-menu-item index="/prompts">
    27|          <el-icon><ChatLineSquare /></el-icon>
    28|          <template #title>提示词库</template>
    29|        </el-menu-item>
    30|        
    31|        <el-menu-item index="/genres">
    32|          <el-icon><Collection /></el-icon>
    33|          <template #title>小说类型管理</template>
    34|        </el-menu-item>
    35|        
    36|        <el-menu-item index="/chapters">
    37|          <el-icon><Notebook /></el-icon>
    38|          <template #title>章节管理</template>
    39|        </el-menu-item>
    40|        
    41|        <el-menu-item index="/goals">
    42|          <el-icon><Aim /></el-icon>
    43|          <template #title>写作目标</template>
    44|        </el-menu-item>
    45|        
    46|        <el-menu-item index="/billing">
    47|          <el-icon><CreditCard /></el-icon>
    48|          <template #title>Token计费</template>
    49|        </el-menu-item>
    50|        
    51|        <el-menu-item index="/tools">
    52|          <el-icon><Tools /></el-icon>
    53|          <template #title>工具库</template>
    54|        </el-menu-item>
    55|        
    56|        <el-menu-item index="/short-story">
    57|          <el-icon><EditPen /></el-icon>
    58|          <template #title>短文写作</template>
    59|        </el-menu-item>
    60|        
    61|        <el-menu-item index="/book-analysis">
    62|          <el-icon><DataAnalysis /></el-icon>
    63|          <template #title>拆书工具</template>
    64|        </el-menu-item>
    65|        
    66|        <el-menu-item index="/settings">
    67|          <el-icon><Setting /></el-icon>
    68|          <template #title>系统设置</template>
    69|        </el-menu-item>
    70|      </el-menu>
    71|    </div>
    72|    
    73|    <!-- 主要内容区域 -->
    74|    <div class="main-container">
    75|      <!-- 顶部导航栏 -->
    76|      <div class="header">
    77|        <div class="header-left">
    78|          <el-button 
    79|            type="text" 
    80|            @click="toggleSidebar"
    81|            class="collapse-btn"
    82|          >
    83|            <el-icon><Expand v-if="isCollapse" /><Fold v-else /></el-icon>
    84|          </el-button>
    85|          <span class="page-title">{{ pageTitle }}</span>
    86|        </div>
    87|        
    88|        <div class="header-right">
    89|          <!-- 模型选择 -->
    90|          <div class="model-selector" v-if="isApiConfigured">
    91|            <el-select 
    92|              v-model="currentModel"
    93|              @change="handleModelChange"
    94|              size="small"
    95|              style="width: 220px"
    96|              placeholder="选择模型"
    97|            >
    98|              <!-- 官方模型组 -->
    99|              <el-option-group label="🏢 墨灵官方模型">
   100|                <el-option
   101|                  v-for="model in officialModels"
   102|                  :key="model.id"
   103|                  :label="model.name"
   104|                  :value="model.id"
   105|                >
   106|                  <span>{{ model.name }}</span>
   107|                  <span style="float: right; color: #8492a6; font-size: 12px">
   108|                    {{ model.price }}
   109|                  </span>
   110|                </el-option>
   111|              </el-option-group>
   112|              
   113|              <!-- 自定义模型组 -->
   114|              <el-option-group label="⚙️ 自定义模型" v-if="customModels.length > 0">
   115|                <el-option
   116|                  v-for="model in customModels"
   117|                  :key="model.id"
   118|                  :label="model.name"
   119|                  :value="model.id"
   120|                >
   121|                  <span>{{ model.name }}</span>
   122|                  <span v-if="model.description" style="float: right; color: #8492a6; font-size: 12px">
   123|                    {{ model.description }}
   124|                  </span>
   125|                </el-option>
   126|              </el-option-group>
   127|            </el-select>
   128|          </div>
   129|
   130|          <!-- 公告及教程 -->
   131|          <el-button 
   132|            @click="openAnnouncement" 
   133|            type="primary"
   134|            size="small"
   135|          >
   136|            <el-icon><Bell /></el-icon>
   137|            公告及教程
   138|          </el-button>
   139|
   140|          <!-- API配置状态 -->
   141|          <el-button 
   142|            @click="showApiConfig = true" 
   143|            :type="isApiConfigured ? 'success' : 'warning'"
   144|            size="small"
   145|          >
   146|            <el-icon><Key /></el-icon>
   147|            {{ isApiConfigured ? 'API已配置' : 'API配置' }}
   148|          </el-button>
   149|        </div>
   150|      </div>
   151|      
   152|      <!-- 页面内容 -->
   153|      <div class="content">
   154|        <router-view />
   155|      </div>
   156|    </div>
   157|    
   158|    <!-- API配置对话框 -->
   159|    <el-dialog v-model="showApiConfig" title="API配置" width="1000px">
   160|      <ApiConfig @close="showApiConfig = false" />
   161|    </el-dialog>
   162|
   163|    <!-- 公告对话框 -->
   164|    <AnnouncementDialog
   165|      v-model:visible="showAnnouncement"
   166|      :announcement="currentAnnouncement"
   167|      @close="handleAnnouncementClose"
   168|    />
   169|  </div>
   170|</template>
   171|
   172|<script setup>
   173|import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
   174|import { useRouter, useRoute } from 'vue-router'
   175|import { useNovelStore } from '@/stores/novel'
   176|import { 
   177|  House, Document, ChatLineSquare, Collection, Notebook, Aim, 
   178|  CreditCard, Setting, Key, Tools, EditPen, DataAnalysis,
   179|  Expand, Fold, Bell 
   180|} from '@element-plus/icons-vue'
   181|import ApiConfig from '@/components/ApiConfig.vue'
   182|import AnnouncementDialog from '@/components/AnnouncementDialog.vue'
   183|import { getLatestAnnouncement } from '@/config/announcements.js'
   184|import { ElMessage } from 'element-plus'
   185|
   186|const router = useRouter()
   187|const route = useRoute()
   188|const novelStore = useNovelStore()
   189|
   190|// 响应式数据
   191|const isCollapse = ref(false)
   192|const showApiConfig = ref(false)
   193|const showAnnouncement = ref(false)
   194|const currentAnnouncement = ref({})
   195|const activeMenu = ref('/')
   196|const currentModel = ref('')
   197|const configType = ref('official')
   198|const forceUpdate = ref(0) // 用于强制更新计算属性
   199|
   200|// 计算属性
   201|const isApiConfigured = computed(() => novelStore.isApiConfigured)
   202|
   203|// 获取当前API配置
   204|const currentApiConfig = computed(() => {
   205|  return novelStore.getCurrentApiConfig()
   206|})
   207|
   208|// 官方模型列表（固定）
   209|const officialModels = computed(() => [
   210|  {
   211|    id: 'claude-4-sonnet',
   212|    name: 'Claude-4 Sonnet',
   213|    description: '最新一代Claude模型，擅长创意写作和长文本处理',
   214|    price: '￥0.1/次'
   215|  },
   216|  {
   217|    id: 'claude-opus-4-20250514',
   218|    name: 'Claude Opus 4',
   219|    description: '最强性能Claude模型，顶级创作能力',
   220|    price: '￥0.5/次'
   221|  },
   222|  {
   223|    id: 'claude-3-7-sonnet-thinking',
   224|    name: 'Claude-3.7 Sonnet Thinking',
   225|    description: '具备思维链的Claude模型，逻辑推理强',
   226|    price: '￥0.2/次'
   227|  },
   228|  {
   229|    id: 'claude-3-7-sonnet-20250219',
   230|    name: 'Claude-3.7 Sonnet',
   231|    description: '高性能版本，平衡性能与成本',
   232|    price: '￥0.1/次'
   233|  }
   234|])
   235|
   236|// 自定义模型列表（从API配置中读取）
   237|const customModels = computed(() => {
   238|  // 依赖于 forceUpdate 来强制重新计算
   239|  forceUpdate.value
   240|  
   241|  const models = []
   242|  
   243|  try {
   244|    // 从ApiConfig组件的配置中读取自定义模型
   245|    const savedCustomModels = localStorage.getItem('customModels')
   246|    if (savedCustomModels) {
   247|      const parsed = JSON.parse(savedCustomModels)
   248|      models.push(...parsed)
   249|    }
   250|    
   251|    // 添加一些默认的自定义模型选项
   252|    const defaultCustomModels = [
   253|      {
   254|        id: 'deepseek-reasoner',
   255|        name: 'deepseek-r1',
   256|        description: '深度思考推理模型'
   257|      },
   258|      {
   259|        id: 'deepseek-chat',
   260|        name: 'deepseek-v3',
   261|        description: '深度求索对话模型'
   262|      },
   263|      {
   264|        id: 'gpt-4o',
   265|        name: 'GPT-4o',
   266|        description: 'OpenAI最新多模态模型'
   267|      },
   268|      {
   269|        id: 'gpt-4o-mini',
   270|        name: 'GPT-4o mini',
   271|        description: 'GPT-4o轻量版本'
   272|      },
   273|      {
   274|        id: 'gpt-3.5-turbo',
   275|        name: 'GPT-3.5 Turbo',
   276|        description: 'OpenAI经典对话模型'
   277|      }
   278|    ]
   279|    
   280|    // 合并默认模型和自定义模型，去重
   281|    const allModels = [...defaultCustomModels]
   282|    for (const model of models) {
   283|      if (!allModels.find(m => m.id === model.id)) {
   284|        allModels.push(model)
   285|      }
   286|    }
   287|    
   288|    console.log('自定义模型列表:', allModels) // 调试日志
   289|    return allModels
   290|    
   291|  } catch (error) {
   292|    console.error('读取自定义模型失败:', error)
   293|    return []
   294|  }
   295|})
   296|
   297|const pageTitle = computed(() => {
   298|  const titleMap = {
   299|    '/': '首页',
   300|    '/novels': '小说列表',
   301|    '/prompts': '提示词库',
   302|    '/genres': '小说类型管理',
   303|    '/chapters': '章节管理',
   304|    '/goals': '写作目标',
   305|    '/billing': 'Token计费',
   306|    '/tools': '工具库',
   307|    '/short-story': '短文写作',
   308|    '/book-analysis': '拆书工具',
   309|    '/settings': '系统设置'
   310|  }
   311|  return titleMap[route.path] || '首页'
   312|})
   313|
   314|// 获取当前配置类型的函数
   315|const getCurrentConfigType = () => {
   316|  try {
   317|    // 从localStorage获取配置类型
   318|    const savedConfigType = localStorage.getItem('apiConfigType')
   319|    console.log('从localStorage获取的配置类型:', savedConfigType) // 调试日志
   320|    
   321|    // 如果没有保存的配置类型，尝试通过API地址判断
   322|    if (!savedConfigType && isApiConfigured.value && currentApiConfig.value) {
   323|      const baseURL = currentApiConfig.value.baseURL
   324|      console.log('API地址:', baseURL) // 调试日志
   325|      
   326|      if (baseURL && baseURL.includes('91hub.vip')) {
   327|        console.log('通过API地址判断为官方配置') // 调试日志
   328|        return 'official'
   329|      } else {
   330|        console.log('通过API地址判断为自定义配置') // 调试日志
   331|        return 'custom'
   332|      }
   333|    }
   334|    
   335|    return savedConfigType || 'official'
   336|  } catch (error) {
   337|    console.error('获取配置类型失败:', error)
   338|    return 'official'
   339|  }
   340|}
   341|
   342|// 方法
   343|const toggleSidebar = () => {
   344|  isCollapse.value = !isCollapse.value
   345|}
   346|
   347|const handleMenuSelect = (index) => {
   348|  router.push(index)
   349|}
   350|
   351|// 公告相关功能
   352|const openAnnouncement = () => {
   353|  try {
   354|    currentAnnouncement.value = getLatestAnnouncement()
   355|    showAnnouncement.value = true
   356|  } catch (error) {
   357|    console.error('获取公告错误:', error)
   358|  }
   359|}
   360|
   361|const handleAnnouncementClose = () => {
   362|  showAnnouncement.value = false
   363|}
   364|
   365|// 模型相关功能
   366|const handleModelChange = (modelId) => {
   367|  try {
   368|    console.log('切换模型:', modelId) // 调试日志
   369|    
   370|    // 判断选择的是官方模型还是自定义模型
   371|    const isOfficialModel = officialModels.value.find(m => m.id === modelId)
   372|    const isCustomModel = customModels.value.find(m => m.id === modelId)
   373|    
   374|    let newConfig = {}
   375|    let newConfigType = ''
   376|    
   377|    if (isOfficialModel) {
   378|      console.log('选择了官方模型，切换到官方配置') // 调试日志
   379|      // 选择了官方模型，切换到官方配置
   380|      newConfigType = 'official'
   381|      
   382|      // 加载官方配置的基础参数
   383|      const savedOfficialConfig = localStorage.getItem('officialApiConfig')
   384|      if (savedOfficialConfig) {
   385|        newConfig = JSON.parse(savedOfficialConfig)
   386|      } else {
   387|        // 如果没有保存的官方配置，使用默认值
   388|        newConfig = {
   389|          baseURL: 'https://ai.91hub.vip/v1',
   390|          maxTokens: 2000000,
   391|          unlimitedTokens: false,
   392|          temperature: 0.7,
   393|          apiKey: '' // 需要用户配置
   394|        }
   395|      }
   396|      newConfig.selectedModel = modelId
   397|      
   398|      // 保存配置类型
   399|      localStorage.setItem('apiConfigType', 'official')
   400|      // 保存官方配置
   401|      localStorage.setItem('officialApiConfig', JSON.stringify(newConfig))
   402|      
   403|    } else if (isCustomModel) {
   404|      console.log('选择了自定义模型，切换到自定义配置') // 调试日志
   405|      // 选择了自定义模型，切换到自定义配置
   406|      newConfigType = 'custom'
   407|      
   408|      // 加载自定义配置的基础参数
   409|      const savedCustomConfig = localStorage.getItem('customApiConfig')
   410|      if (savedCustomConfig) {
   411|        newConfig = JSON.parse(savedCustomConfig)
   412|      } else {
   413|        // 如果没有保存的自定义配置，使用默认值
   414|        newConfig = {
   415|          baseURL: 'https://api.openai.com/v1',
   416|          maxTokens: 2000000,
   417|          unlimitedTokens: false,
   418|          temperature: 0.7,
   419|          apiKey: '' // 需要用户配置
   420|        }
   421|      }
   422|      newConfig.selectedModel = modelId
   423|      
   424|      // 保存配置类型
   425|      localStorage.setItem('apiConfigType', 'custom')
   426|      // 保存自定义配置
   427|      localStorage.setItem('customApiConfig', JSON.stringify(newConfig))
   428|      
   429|    } else {
   430|      console.error('未知的模型类型:', modelId)
   431|      ElMessage.error('未知的模型类型')
   432|      return
   433|    }
   434|    
   435|    // 更新当前配置类型
   436|    configType.value = newConfigType
   437|    
   438|    // 更新store中的API配置，使用新的分离配置系统
   439|    novelStore.updateApiConfig(newConfig, newConfigType)
   440|    novelStore.switchConfigType(newConfigType)
   441|    
   442|    // 强制更新界面
   443|    forceUpdate.value++
   444|    
   445|    const modelName = getModelDisplayName(modelId)
   446|    const configTypeName = newConfigType === 'official' ? '官方配置' : '自定义配置'
   447|    
   448|    // 检查是否需要配置API密钥
   449|    const needsApiKey = !newConfig.apiKey || newConfig.apiKey.trim() === ''
   450|    
   451|    if (needsApiKey) {
   452|      ElMessage.warning(`已切换到${configTypeName}: ${modelName}，请先配置API密钥`)
   453|      // 可以考虑自动打开API配置对话框
   454|      setTimeout(() => {
   455|        showApiConfig.value = true
   456|      }, 1000)
   457|    } else {
   458|      ElMessage.success(`已切换到${configTypeName}: ${modelName}`)
   459|    }
   460|    
   461|    console.log('配置切换完成:', { configType: newConfigType, config: newConfig, needsApiKey }) // 调试日志
   462|    
   463|  } catch (error) {
   464|    console.error('切换模型失败:', error)
   465|    ElMessage.error('切换模型失败: ' + error.message)
   466|  }
   467|}
   468|
   469|const getModelDisplayName = (modelId) => {
   470|  // 先在官方模型中查找
   471|  let model = officialModels.value.find(m => m.id === modelId)
   472|  if (model) return model.name
   473|  
   474|  // 再在自定义模型中查找
   475|  model = customModels.value.find(m => m.id === modelId)
   476|  if (model) return model.name
   477|  
   478|  // 都找不到就返回原ID
   479|  return modelId
   480|}
   481|
   482|// 初始化模型选择器
   483|const initializeModelSelector = () => {
   484|  try {
   485|    // 获取配置类型
   486|    const savedConfigType = localStorage.getItem('apiConfigType') || 'official'
   487|    configType.value = savedConfigType
   488|    
   489|    // 获取当前选中的模型
   490|    if (isApiConfigured.value && currentApiConfig.value) {
   491|      currentModel.value = currentApiConfig.value.selectedModel || ''
   492|    }
   493|    
   494|    // 强制更新模型列表
   495|    forceUpdate.value++
   496|    
   497|    console.log('模型选择器初始化完成, 配置类型:', savedConfigType, '当前模型:', currentModel.value) // 调试日志
   498|  } catch (error) {
   499|    console.error('初始化模型选择器失败:', error)
   500|  }
   501|}
   502|
   503|// 监听路由变化
   504|watch(() => route.path, (newPath) => {
   505|  activeMenu.value = newPath
   506|}, { immediate: true })
   507|
   508|// 监听API配置变化，更新模型选择器
   509|watch(() => [isApiConfigured.value, currentApiConfig.value], () => {
   510|  initializeModelSelector()
   511|}, { immediate: true })
   512|
   513|// 监听localStorage变化的函数
   514|const handleStorageChange = (event) => {
   515|  if (event.key === 'apiConfigType' || event.key === 'officialApiConfig' || event.key === 'customApiConfig' || event.key === 'customModels') {
   516|    console.log('检测到localStorage配置变化:', event.key, event.newValue) // 调试日志
   517|    // 延迟执行，确保数据已更新
   518|    setTimeout(() => {
   519|      initializeModelSelector()
   520|    }, 100)
   521|  }
   522|}
   523|
   524|// 组件挂载时初始化
   525|onMounted(() => {
   526|  initializeModelSelector()
   527|  // 监听localStorage变化
   528|  window.addEventListener('storage', handleStorageChange)
   529|  
   530|  // 手动触发一次检查（处理同页面内的变化）
   531|  const checkConfigChange = () => {
   532|    const currentType = localStorage.getItem('apiConfigType')
   533|    if (currentType !== configType.value) {
   534|      console.log('检测到配置类型变化:', configType.value, '->', currentType)
   535|      initializeModelSelector()
   536|    }
   537|  }
   538|  
   539|  // 定期检查配置变化（处理同页面内的localStorage变化）
   540|  const intervalId = setInterval(checkConfigChange, 1000)
   541|  
   542|  // 保存interval ID以便清理
   543|  window.modelSelectorInterval = intervalId
   544|})
   545|
   546|// 组件卸载时清理
   547|onUnmounted(() => {
   548|  window.removeEventListener('storage', handleStorageChange)
   549|  if (window.modelSelectorInterval) {
   550|    clearInterval(window.modelSelectorInterval)
   551|    delete window.modelSelectorInterval
   552|  }
   553|})
   554|
   555|</script>
   556|
   557|<style scoped>
   558|.dashboard-container {
   559|  display: flex;
   560|  height: 100vh;
   561|  background-color: #f5f5f5;
   562|}
   563|
   564|.sidebar {
   565|  width: 250px;
   566|  background-color: #304156;
   567|  color: white;
   568|  display: flex;
   569|  flex-direction: column;
   570|  transition: width 0.3s;
   571|  overflow: hidden;
   572|}
   573|
   574|.sidebar.collapsed {
   575|  width: 64px;
   576|}
   577|
   578|.sidebar.collapsed .logo h2 {
   579|  display: none;
   580|}
   581|
   582|.logo {
   583|  height: 60px;
   584|  display: flex;
   585|  align-items: center;
   586|  justify-content: center;
   587|  background-color: #2b3a4b;
   588|  color: white;
   589|  margin: 0;
   590|}
   591|
   592|.logo h2 {
   593|  margin: 0;
   594|  font-size: 18px;
   595|  white-space: nowrap;
   596|}
   597|
   598|.sidebar-menu {
   599|  border: none;
   600|  background-color: #304156;
   601|  height: calc(100vh - 60px);
   602|}
   603|
   604|.sidebar-menu .el-menu-item,
   605|.sidebar-menu .el-sub-menu__title {
   606|  color: #bfcbd9;
   607|  border-bottom: none;
   608|}
   609|
   610|.sidebar-menu .el-menu-item:hover,
   611|.sidebar-menu .el-sub-menu__title:hover {
   612|  background-color: #263445;
   613|  color: #409eff;
   614|}
   615|
   616|.sidebar-menu .el-menu-item.is-active {
   617|  background-color: #409eff;
   618|  color: white;
   619|}
   620|
   621|.main-container {
   622|  flex: 1;
   623|  display: flex;
   624|  flex-direction: column;
   625|  overflow: hidden;
   626|}
   627|
   628|.header {
   629|  height: 60px;
   630|  background-color: white;
   631|  border-bottom: 1px solid #e4e7ed;
   632|  display: flex;
   633|  align-items: center;
   634|  justify-content: space-between;
   635|  padding: 0 20px;
   636|  box-shadow: 0 1px 4px rgba(0,21,41,.08);
   637|}
   638|
   639|.header-left {
   640|  display: flex;
   641|  align-items: center;
   642|}
   643|
   644|.collapse-btn {
   645|  margin-right: 15px;
   646|  font-size: 18px;
   647|}
   648|
   649|.page-title {
   650|  font-size: 18px;
   651|  font-weight: 500;
   652|  color: #303133;
   653|}
   654|
   655|.header-right {
   656|  display: flex;
   657|  align-items: center;
   658|  gap: 15px;
   659|}
   660|
   661|.model-selector {
   662|  display: flex;
   663|  align-items: center;
   664|}
   665|
   666|.model-selector .el-select {
   667|  min-width: 200px;
   668|}
   669|
   670|.model-selector .el-select .el-input__inner {
   671|  font-size: 13px;
   672|}
   673|
   674|/* 模型分组样式 */
   675|.model-selector :deep(.el-select-group__title) {
   676|  font-weight: 600;
   677|  color: #409eff;
   678|  padding: 8px 12px;
   679|  background-color: #f8f9fa;
   680|  border-bottom: 1px solid #e4e7ed;
   681|}
   682|
   683|.model-selector :deep(.el-option-group .el-option) {
   684|  padding-left: 20px;
   685|}
   686|
   687|.model-selector :deep(.el-option-group:not(:last-child)) {
   688|  border-bottom: 1px solid #e4e7ed;
   689|}
   690|
   691|.user-info {
   692|  display: flex;
   693|  align-items: center;
   694|  gap: 8px;
   695|  cursor: pointer;
   696|  padding: 5px 10px;
   697|  border-radius: 4px;
   698|  transition: background-color 0.3s;
   699|}
   700|
   701|.user-info:hover {
   702|  background-color: #f5f7fa;
   703|}
   704|
   705|.username {
   706|  color: #606266;
   707|  font-size: 14px;
   708|}
   709|
   710|.content {
   711|  flex: 1;
   712|  padding: 20px;
   713|  overflow-y: auto;
   714|  background-color: #f5f5f5;
   715|}
   716|
   717|/* 响应式设计 */
   718|@media (max-width: 768px) {
   719|  .sidebar {
   720|    position: fixed;
   721|    z-index: 1000;
   722|    height: 100vh;
   723|  }
   724|  
   725|  .main-container {
   726|    margin-left: 0;
   727|  }
   728|  
   729|  .content {
   730|    padding: 15px;
   731|  }
   732|}
   733|</style>