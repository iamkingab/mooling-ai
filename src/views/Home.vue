     1|<template>
     2|  <div class="home-container">
     3|    <!-- 顶部导航 -->
     4|    <div class="top-nav">
     5|      <div class="nav-left">
     6|        <h1 class="app-title">📚 墨灵AI小说生成器</h1>
     7|      </div>
     8|      <div class="nav-right">
     9|        <el-button @click="showStatsDialog = true">
    10|          <el-icon class="mr-2"><DataAnalysis /></el-icon>
    11|          文章统计
    12|        </el-button>
    13|        <el-button @click="showCorpusDialog = true">
    14|          <el-icon class="mr-2"><Collection /></el-icon>
    15|          语料库
    16|        </el-button>
    17|        <el-button @click="showTemplateDialog = true">
    18|          <el-icon class="mr-2"><Setting /></el-icon>
    19|          模板管理
    20|        </el-button>
    21|        <el-button @click="showSummaryDialog = true">
    22|          <el-icon class="mr-2"><Document /></el-icon>
    23|          文章摘要
    24|        </el-button>
    25|        <el-button @click="showChapterManagerDialog = true">
    26|          <el-icon class="mr-2"><Notebook /></el-icon>
    27|          章节管理
    28|        </el-button>
    29|        <el-button @click="showWritingGoalsDialog = true">
    30|          <el-icon class="mr-2"><Aim /></el-icon>
    31|          写作目标
    32|        </el-button>
    33|        <el-button @click="showBackupDialog = true">
    34|          <el-icon class="mr-2"><FolderOpened /></el-icon>
    35|          备份管理
    36|        </el-button>
    37|        <el-button @click="showApiConfigDialog = true" :type="isApiConfigured ? 'success' : 'warning'">
    38|          <el-icon class="mr-2"><Key /></el-icon>
    39|          {{ isApiConfigured ? 'API已配置' : 'API配置' }}
    40|        </el-button>
    41|        <el-button @click="openAnnouncement" type="primary">
    42|          <el-icon class="mr-2"><Bell /></el-icon>
    43|          公告及教程
    44|        </el-button>
    45|      </div>
    46|    </div>
    47|
    48|    <!-- 主要内容区域 -->
    49|    <div class="main-content">
    50|      <!-- 左侧面板 -->
    51|      <div class="left-panel">
    52|        <el-tabs v-model="activeTab" type="border-card">
    53|          <el-tab-pane label="📝 创作设置" name="settings">
    54|            <!-- 关键词输入 -->
    55|            <el-card shadow="hover">
    56|              <template #header>
    57|                <div class="card-header">
    58|                  <span>🔑 关键词</span>
    59|                </div>
    60|              </template>
    61|              <el-input
    62|                v-model="keywords"
    63|                placeholder="请输入小说关键词，如：玄幻、修仙、都市..."
    64|                clearable
    65|              />
    66|            </el-card>
    67|
    68|            <!-- 模板选择 -->
    69|            <el-card shadow="hover" style="margin-top: 16px;">
    70|              <template #header>
    71|                <div class="card-header">
    72|                  <span>📄 写作模板</span>
    73|                </div>
    74|              </template>
    75|              <el-select 
    76|                v-model="selectedTemplate" 
    77|                placeholder="请选择写作模板"
    78|                style="width: 100%"
    79|                value-key="id"
    80|                @change="handleTemplateChange"
    81|              >
    82|                <el-option
    83|                  v-for="template in templates"
    84|                  :key="template.id"
    85|                  :label="template.name"
    86|                  :value="template"
    87|                >
    88|                  <span>{{ template.name }}</span>
    89|                  <span style="float: right; color: #8492a6; font-size: 13px">
    90|                    {{ template.description }}
    91|                  </span>
    92|                </el-option>
    93|              </el-select>
    94|            </el-card>
    95|
    96|            <!-- 大纲区域 -->
    97|            <el-card class="outline-card" style="margin-top: 16px;">
    98|              <template #header>
    99|                <div class="card-header">
   100|                  <span>📋 小说大纲</span>
   101|                  <div>
   102|                    <el-button 
   103|                      type="primary" 
   104|                      size="small" 
   105|                      @click="generateOutline"
   106|                      :loading="isGeneratingOutline"
   107|                      :disabled="!keywords.trim()"
   108|                    >
   109|                      {{ isGeneratingOutline ? '生成中...' : '生成大纲' }}
   110|                    </el-button>
   111|                    <el-button 
   112|                      size="small" 
   113|                      @click="clearOutlineContent"
   114|                      :disabled="!outline"
   115|                    >
   116|                      清空
   117|                    </el-button>
   118|                  </div>
   119|                </div>
   120|              </template>
   121|              <div class="outline-container">
   122|                <el-input
   123|                  v-model="outline"
   124|                  type="textarea"
   125|                  :rows="6"
   126|                  placeholder="点击'生成大纲'按钮，AI将根据关键词为您生成小说大纲..."
   127|                  resize="none"
   128|                />
   129|              </div>
   130|            </el-card>
   131|
   132|            <!-- 章节管理区域 -->
   133|            <el-card class="chapters-card" v-if="chapters.length > 0" shadow="hover" style="margin-top: 16px;">
   134|              <template #header>
   135|                <div class="card-header">
   136|                  <span>📖 章节管理</span>
   137|                  <el-button 
   138|                    type="success" 
   139|                    size="small" 
   140|                    @click="generateChapterContent"
   141|                    :loading="isGeneratingChapter"
   142|                    :disabled="!selectedChapter"
   143|                  >
   144|                    {{ isGeneratingChapter ? '生成中...' : '生成内容' }}
   145|                  </el-button>
   146|                </div>
   147|              </template>
   148|              <div class="chapters-container">
   149|                <div class="chapters-list">
   150|                  <div 
   151|                    v-for="chapter in chapters" 
   152|                    :key="chapter.id"
   153|                    class="chapter-item"
   154|                    :class="{ 'selected': selectedChapter?.id === chapter.id, 'completed': chapter.isCompleted }"
   155|                    @click="selectChapter(chapter)"
   156|                  >
   157|                    <div class="chapter-title">{{ chapter.title }}</div>
   158|                    <div class="chapter-status">
   159|                      <el-tag v-if="chapter.isCompleted" type="success" size="small">已生成</el-tag>
   160|                      <el-tag v-else type="info" size="small">待生成</el-tag>
   161|                    </div>
   162|                  </div>
   163|                </div>
   164|                <div v-if="selectedChapter" class="chapter-detail">
   165|                  <div class="chapter-content">
   166|                    <h4>{{ selectedChapter.title }}</h4>
   167|                    <p>{{ selectedChapter.content }}</p>
   168|                    <div v-if="selectedChapter.generatedText" class="generated-content">
   169|                      <h5>生成的内容：</h5>
   170|                      <div class="generated-text">{{ selectedChapter.generatedText }}</div>
   171|                      <el-button 
   172|                        type="primary" 
   173|                        size="small" 
   174|                        @click="addChapterToEditor"
   175|                        style="margin-top: 10px;"
   176|                      >
   177|                        添加到编辑器
   178|                      </el-button>
   179|                    </div>
   180|                  </div>
   181|                </div>
   182|              </div>
   183|            </el-card>
   184|
   185|            <!-- AI写作助手 -->
   186|            <el-card class="ai-chat-card" shadow="hover" style="margin-top: 16px;">
   187|              <template #header>
   188|                <div class="card-header">
   189|                  <span>🤖 AI写作助手</span>
   190|                  <el-button 
   191|                    size="small" 
   192|                    @click="clearChatHistory"
   193|                    :disabled="aiChatHistory.length === 0"
   194|                  >
   195|                    清空对话
   196|                  </el-button>
   197|                </div>
   198|              </template>
   199|              <div class="ai-chat-container">
   200|                <div class="chat-history">
   201|                  <div 
   202|                    v-for="message in aiChatHistory" 
   203|                    :key="message.id"
   204|                    class="chat-message"
   205|                    :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }"
   206|                  >
   207|                    <div class="message-content">{{ message.content }}</div>
   208|                    <div class="message-time">{{ message.timestamp }}</div>
   209|                  </div>
   210|                  <div v-if="aiChatHistory.length === 0" class="empty-chat">
   211|                    💡 向AI助手提问，获取写作建议和灵感
   212|                  </div>
   213|                </div>
   214|                <div class="chat-input">
   215|                  <el-input
   216|                    v-model="currentChatInput"
   217|                    placeholder="向AI助手提问...（如：如何让对话更生动？）"
   218|                    @keyup.enter="sendChatMessage"
   219|                    :disabled="isAiChatting"
   220|                  >
   221|                    <template #append>
   222|                      <el-button 
   223|                        @click="sendChatMessage"
   224|                        :loading="isAiChatting"
   225|                        :disabled="!currentChatInput.trim()"
   226|                      >
   227|                        发送
   228|                      </el-button>
   229|                    </template>
   230|                  </el-input>
   231|                </div>
   232|              </div>
   233|            </el-card>
   234|          </el-tab-pane>
   235|          
   236|          <el-tab-pane label="🛠️ 写作工具" name="tools">
   237|            <WritingTools />
   238|          </el-tab-pane>
   239|        </el-tabs>
   240|      </div>
   241|
   242|      <!-- 中间编辑区 -->
   243|      <div class="center-panel">
   244|        <el-card class="editor-card" shadow="hover">
   245|          <template #header>
   246|            <div class="card-header">
   247|              <span>小说编辑区</span>
   248|              <div>
   249|                <el-button size="small" @click="generateContent" :loading="isGenerating" :disabled="!keywords.trim()">
   250|                  {{ isGenerating ? '生成中...' : '生成内容' }}
   251|                </el-button>
   252|                <el-button size="small" @click="exportNovel">
   253|                  导出
   254|                </el-button>
   255|                <el-button size="small" @click="clearNovel">
   256|                  清空
   257|                </el-button>
   258|              </div>
   259|            </div>
   260|          </template>
   261|          
   262|          <!-- 生成状态提示 -->
   263|          <div v-if="isGenerating || isGeneratingOutline || isGeneratingChapter" class="generation-status">
   264|            <el-alert
   265|              :title="getGenerationStatusText()"
   266|              type="info"
   267|              :closable="false"
   268|              show-icon
   269|            >
   270|              <template #default>
   271|                <div class="status-content">
   272|                  <el-icon class="rotating"><Loading /></el-icon>
   273|                  <span>{{ getGenerationStatusText() }}</span>
   274|                </div>
   275|              </template>
   276|            </el-alert>
   277|          </div>
   278|          
   279|          <div class="editor-container">
   280|            <div class="editor-wrapper">
   281|              <Toolbar
   282|                style="border-bottom: 1px solid #ccc"
   283|                :editor="editorRef"
   284|                :defaultConfig="toolbarConfig"
   285|                mode="default"
   286|              />
   287|              <Editor
   288|                style="height: 400px; overflow-y: hidden;"
   289|                v-model="currentNovel"
   290|                :defaultConfig="editorConfig"
   291|                mode="default"
   292|                @onCreated="handleCreated"
   293|              />
   294|            </div>
   295|            
   296|            <!-- 编辑器底部工具栏 -->
   297|            <div class="editor-toolbar">
   298|              <div class="editor-stats">
   299|                <span>字数: {{ wordCount }}</span>
   300|                <span class="ml-2">预计阅读: {{ readingTime }}分钟</span>
   301|              </div>
   302|            </div>
   303|          </div>
   304|        </el-card>
   305|      </div>
   306|
   307|      <!-- 右侧生成结果区 -->
   308|      <div class="right-panel">
   309|        <el-card class="result-card" shadow="hover">
   310|          <template #header>
   311|            <div class="card-header">
   312|              <span>生成结果</span>
   313|              <div>
   314|                <el-button 
   315|                  size="small" 
   316|                  @click="copyToClipboard"
   317|                  :disabled="!generatedContent"
   318|                >
   319|                  复制
   320|                </el-button>
   321|                <el-button 
   322|                  size="small" 
   323|                  @click="addToNovel"
   324|                  :disabled="!generatedContent"
   325|                >
   326|                  加入编辑区
   327|                </el-button>
   328|              </div>
   329|            </div>
   330|          </template>
   331|          
   332|          <div class="result-container">
   333|            <div v-if="generatedContent" class="generated-content">
   334|              <div class="content-text">{{ generatedContent }}</div>
   335|            </div>
   336|            <div v-else class="empty-result">
   337|              <p>暂无生成内容</p>
   338|              <p class="empty-tip">输入关键词并点击生成按钮开始创作</p>
   339|            </div>
   340|          </div>
   341|        </el-card>
   342|      </div>
   343|    </div>
   344|
   345|    <!-- 文章统计对话框 -->
   346|    <el-dialog v-model="showStatsDialog" title="文章统计" width="600px">
   347|      <ArticleStats />
   348|    </el-dialog>
   349|
   350|    <!-- 语料库对话框 -->
   351|    <el-dialog v-model="showCorpusDialog" title="语料库管理" width="800px">
   352|      <CorpusManager />
   353|    </el-dialog>
   354|
   355|    <!-- 模板管理对话框 -->
   356|    <el-dialog v-model="showTemplateDialog" title="模板管理" width="900px">
   357|      <TemplateManager />
   358|    </el-dialog>
   359|
   360|    <!-- API配置对话框 -->
   361|    <el-dialog v-model="showApiConfigDialog" title="API配置" width="1000px">
   362|      <ApiConfig />
   363|    </el-dialog>
   364|
   365|    <!-- 文章摘要对话框 -->
   366|    <el-dialog v-model="showSummaryDialog" title="文章摘要" width="800px">
   367|      <SummaryGenerator />
   368|    </el-dialog>
   369|
   370|    <!-- 章节管理对话框 -->
   371|    <el-dialog v-model="showChapterManagerDialog" title="章节管理" width="1200px" top="5vh">
   372|      <ChapterManager />
   373|    </el-dialog>
   374|
   375|    <!-- 写作目标对话框 -->
   376|    <el-dialog v-model="showWritingGoalsDialog" title="写作目标" width="1000px">
   377|      <WritingGoals />
   378|    </el-dialog>
   379|
   380|    <!-- 备份管理对话框 -->
   381|    <el-dialog v-model="showBackupDialog" title="备份管理" width="1100px">
   382|      <BackupManager />
   383|    </el-dialog>
   384|
   385|    <!-- 公告对话框 -->
   386|    <AnnouncementDialog
   387|      v-model:visible="showAnnouncementDialog"
   388|      :announcement="currentAnnouncement"
   389|      @close="handleAnnouncementClose"
   390|    />
   391|  </div>
   392|</template>
   393|
   394|<script setup>
   395|import { ref, computed, onMounted, shallowRef, onBeforeUnmount, watch } from 'vue'
   396|import { useNovelStore } from '@/stores/novel'
   397|import { ElMessage } from 'element-plus'
   398|import { DataAnalysis, Collection, Setting, Key, Document, Loading, Notebook, Aim, FolderOpened, Bell } from '@element-plus/icons-vue'
   399|import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
   400|import { createEditor, createToolbar } from '@wangeditor/editor'
   401|import '@wangeditor/editor/dist/css/style.css'
   402|import WritingTools from '../components/WritingTools.vue'
   403|import ArticleStats from '@/components/ArticleStats.vue'
   404|import CorpusManager from '@/components/CorpusManager.vue'
   405|import TemplateManager from '@/components/TemplateManager.vue'
   406|import ApiConfig from '@/components/ApiConfig.vue'
   407|import SummaryGenerator from '@/components/SummaryGenerator.vue'
   408|import ChapterManager from '@/components/ChapterManager.vue'
   409|import WritingGoals from '@/components/WritingGoals.vue'
   410|import BackupManager from '@/components/BackupManager.vue'
   411|import AnnouncementDialog from '@/components/AnnouncementDialog.vue'
   412|import { getLatestAnnouncement } from '@/config/announcements.js'
   413|
   414|const novelStore = useNovelStore()
   415|
   416|// 编辑器实例
   417|const editorRef = shallowRef()
   418|const toolbarConfig = {}
   419|const editorConfig = {
   420|  placeholder: '在这里编辑您的小说内容...',
   421|  MENU_CONF: {
   422|    uploadImage: {
   423|      server: '/api/upload-image',
   424|      fieldName: 'file',
   425|      maxFileSize: 5 * 1024 * 1024, // 5M
   426|      allowedFileTypes: ['image/*']
   427|    }
   428|  }
   429|}
   430|
   431|// 响应式数据
   432|const activeTab = ref('settings')
   433|const selectedTemplate = computed({
   434|  get: () => novelStore.selectedTemplate,
   435|  set: (value) => novelStore.setTemplate(value)
   436|})
   437|const keywords = ref('')
   438|const wordLimit = ref(500)
   439|const creativity = ref('medium')
   440|const showStatsDialog = ref(false)
   441|const showCorpusDialog = ref(false)
   442|const showTemplateDialog = ref(false)
   443|const showApiConfigDialog = ref(false)
   444|const showSummaryDialog = ref(false)
   445|const showChapterManagerDialog = ref(false)
   446|const showWritingGoalsDialog = ref(false)
   447|const showBackupDialog = ref(false)
   448|const showAnnouncementDialog = ref(false)
   449|const currentAnnouncement = ref({})
   450|
   451|// 新增章节和AI对话相关状态
   452|const chapters = computed(() => novelStore.chapters)
   453|const selectedChapter = computed(() => novelStore.selectedChapter)
   454|const isGeneratingChapter = computed(() => novelStore.isGeneratingChapter)
   455|const aiChatHistory = computed(() => novelStore.aiChatHistory)
   456|const currentChatInput = computed({
   457|  get: () => novelStore.currentChatInput,
   458|  set: (value) => novelStore.setChatInput(value)
   459|})
   460|const isAiChatting = computed(() => novelStore.isAiChatting)
   461|
   462|// 计算属性
   463|const templates = computed(() => novelStore.templates)
   464|const currentNovel = computed({
   465|  get: () => novelStore.currentNovel,
   466|  set: async (value) => await novelStore.setCurrentNovel(value)
   467|})
   468|const generatedContent = computed(() => novelStore.generatedContent)
   469|const outline = computed(() => novelStore.outline)
   470|const isGenerating = computed(() => novelStore.isGenerating)
   471|const isGeneratingOutline = computed(() => novelStore.isGeneratingOutline)
   472|const wordCount = computed(() => novelStore.wordCount)
   473|const readingTime = computed(() => novelStore.readingTime)
   474|const isApiConfigured = computed(() => novelStore.isApiConfigured)
   475|
   476|// 监听模板变化，自动填充关键词
   477|watch(selectedTemplate, (newTemplate) => {
   478|  if (newTemplate && newTemplate.keywords) {
   479|    // 如果模板有关键词，自动填充到关键词输入框
   480|    if (Array.isArray(newTemplate.keywords)) {
   481|      // 如果是数组，转换为逗号分隔的字符串
   482|      keywords.value = newTemplate.keywords.join('，')
   483|    } else if (typeof newTemplate.keywords === 'string') {
   484|      // 如果是字符串，直接使用
   485|      keywords.value = newTemplate.keywords
   486|    }
   487|    ElMessage.success(`已应用模板：${newTemplate.name}`)
   488|  }
   489|}, { immediate: false })
   490|
   491|// 方法
   492|const handleTemplateChange = (template) => {
   493|  // selectedTemplate是computed属性，会自动调用setTemplate
   494|  console.log('模板已切换:', template?.name)
   495|}
   496|
   497|const clearInputs = () => {
   498|  keywords.value = ''
   499|  novelStore.setTemplate(null)
   500|}
   501|