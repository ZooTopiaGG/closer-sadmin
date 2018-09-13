let api = {
  // 测试环境api-dev.tiejin.cn
  serverDevUrl: 'https://api-dev.tiejin.cn/command/',
  // serverDevUrl: 'https://api-sandbox.tiejin.cn/command/',
  // serverDevUrl: 'http://10.0.3.94:8080/command/',

  // 正式环境
  serverUrl: 'https://api.tiejin.cn/command/',
  // filepath: filePath || 'http://file-sandbox.tiejin.cn',
  file: '/file/upload/public',
  // 用户权限接口
  admin: {
    login: 'closer_sys.login', // 登录
    logout: 'closer_sys.logout', // 登出
    register: 'closer_sys.register', // 注册
    send_code: 'closer_sys.send_code', // 获取验证码
    list: 'closer_sys_user.list', // 获取超管用户列表
    update: 'closer_sys_user.update', // 修改超管用户信息与授权操作
    menulist: 'closer_sys_menu.list', // 权限集合查询api
    searchuser: 'closer_sys_user.search', // 搜索用户
    log: 'closer_sys_log.list',
    delete: 'closer_sys_user.delete' // 删除用户
  },
  // 城市管理接口
  region: {
    // 城市列表
    regions: 'closer_region_superadmin.regions',
    // 添加城市（权限验证待加）
    add: 'closer_region_superadmin.add',
    // 城市详情
    show: 'closer_region_superadmin.show',
    // 修改城市（权限验证待加）
    update: 'closer_region_superadmin.update',
  },
  // 栏目管理接口
  community: {
    // 获取栏目详情
    show: 'closer_community_sadmin.show',
    // 绑定发公告栏目
    set_bind_announce_community: 'closer_community_sadmin.set_bind_announce_community',
    // 设置发公告栏目
    get_bind_announce_community: 'closer_community_sadmin.get_bind_announce_community',
    // 获取栏目列表
    get_community_list_by_region: 'closer_community_sadmin.get_community_list_by_region',
    // 绑定默认栏目（自营或推荐）/取消默认栏目
    set_self_community: 'closer_community_sadmin.set_self_community',
    // 设置给城市供给封面的栏目
    set_cover_region_community: 'closer_community_sadmin.set_cover_region_community',
    // 获取栏目申请的修改内容
    get_apply_by_community: 'closer_community_sadmin.get_apply_by_community',
    // 修改栏目实体
    update_community: 'closer_community_sadmin.update_community',
    // 确认或拒绝栏目的修改申请
    verify_update_community: 'closer_community_sadmin.verify_community_change',
    // 确认或拒绝栏 目的审核
    verify_community: 'closer_community_sadmin.verify_community',
    // 邀请栏目并且邀请码
    invite_code: 'closer_community_superadmin.invite_code',
    // 禁言
    ban: 'closer_community_superadmin.ban' // flag 1 禁言  0 取消 communityid
  },
  // 内容管理 接口
  subject: {
    // 获取video播放密钥
    videos: 'ali_vod.accessInfo',
    // 帖子详情
    show: 'closer_subject_sadmin.show',
    // 更新为已读
    update_read: 'closer_subject_sadmin.update_read',
    // 更新帖子上下墙状态
    update_verify: 'closer_subject_sadmin.update_verfiy',
    // 回收站列表
    recycle_bin: 'closer_subject_sadmin.recycle_bin',
    // 获取已读未读列表
    read_list: 'closer_subject_sadmin.read_list',
    // 获取管理员读取过的数量列表
    read_count_list: 'closer_subject_sadmin.admin_read_count_list',
    // 获取已读条数
    read_count: 'closer_subject_sadmin.read_count',
    comments: 'closer_subject_sadmin.comments',
    delete_comment: 'closer_subject_sadmin.delete_comment',
    // 通过帖子名称和栏目名称搜索
    adminSearch: 'closer_subject_admin.adminSearch',
    // 上封面图
    coverSetting: 'closer_subject_admin.coverSetting',
  },
  // 财务管理 接口
  finance: {
    // 获取验证码
    get_code_by_phone: 'closer_finance_superadmin.get_code_by_phone',
    // 查询所有栏目
    get_community_list: 'closer_community_sadmin.get_community_list',
    //超管系统财务记录-审批记录
    all_recharge_list: 'closer_finance_superadmin.all_recharge_list',
    // 查询用户可用余额
    closer_user_balance: 'closer_finance_superadmin.closer_user_balance',
    // 查询用户记录
    closer_user_list: 'closer_finance_superadmin.closer_user_list',
    // 提交资金充值申请
    commit_apply: 'closer_finance_superadmin.commit_apply',
    // 提交资金修改申请
    update_recharge_setting: 'closer_finance_superadmin.update_recharge_setting',
    // 栏目详情资金信息
    community_detail: 'closer_finance_superadmin.community_detail',
    // 超管系统财务记录-栏目记录
    community_list: 'closer_finance_superadmin.community_list',
    // 查询充值待审核列表
    recharge_apply_list: 'closer_finance_superadmin.recharge_apply_list',
    // 查询修改待审核列表
    recharge_settings_apply_list: 'closer_finance_superadmin.recharge_settings_apply_list',
    // 充值审核
    recharge_audit: 'closer_finance_superadmin.recharge_audit',
    // 修改审核
    audit_recharge_setting: 'closer_finance_superadmin.audit_recharge_setting',
    // 允许/禁止用户提现
    lock_wallet: 'closer_finance_superadmin.lock_wallet',
    // 是否允许提现 状态
    wallet_lock_type: 'closer_finance_superadmin.wallet_lock_type',
    // 查询栏目审核通过的充值记录
    wallet_detail_list: 'closer_finance_superadmin.wallet_detail_list',
    // 超管系统财务管理提现记录查询
    withdraw_list: 'closer_finance_superadmin.withdraw_list',
    // 获取提现记录列表
    withdraw_auth_list: 'closer_finance_superadmin.withdraw_auth_list',
    // 审核操作
    auth_status: 'closer_finance_superadmin.auth_status',
    // 近期流水
    user_wallet_detail: 'closer_finance_superadmin.user_wallet_detail'
  },
  activity: {
    // 获取活动列表
    getAllActivity: 'closer_sadmin_activity.getAllActivity',
    // 新建活动
    newActivity: 'closer_sadmin_activity.newActivity',
    // 更新活动
    updateActivity: 'closer_sadmin_activity.updateActivity',
    // 更新活动状态
    updateActivityStatus: 'closer_sadmin_activity.updateActivityStatus',
    // 获取活动数据列表
    closer_activity_list: 'closer_activity.list',
    // 获取活动详情列表
    activity_water_list: 'activity_water.list',
    tuzhu: {
      // 上传题目
      upload_questions: 'closer_sadmin_tuzhu.upload_questions',
      // 获取题目列表
      get_question_list: 'closer_sadmin_tuzhu.get_question_list',
      // 土著活动统计
      get_tuzhu_statistics: 'closer_sadmin_tuzhu.get_tuzhu_statistics'
    }
  },
  config: {
    config_list: 'closer_super_admin_config.get_system_configs',
    reset_config: 'closer_super_admin_config.reset_config'
  },
  promotion: {
    // 获取推广计划或渠道列表
    plan_list: 'closer_promotion_plan.list',
    // 增加一条推广计划或渠道
    plan_add: 'closer_promotion_plan.add',
    // 删除推广计划或渠道
    plan_delete: 'closer_promotion_plan.delete',
    // 查看推广或渠道详情
    plan_show: 'closer_promotion_plan.show',
    // 更新推广计划或渠道
    plan_update: 'closer_promotion_plan.update',
    // 新建推广活动
    activity_add: 'closer_promotion_activity.add',
    // 删除推广活动
    activity_delete: 'closer_promotion_activity.delete',
    // 查询推广活动列表
    activity_list: 'closer_promotion_activity.list',
    // 修改推广活动
    activity_update: 'closer_promotion_activity.update',
    // 增加活动页面访问次数
    activity_view_count: 'closer_promotion_activity.view_count',
    // 增加终端访问记录
    device_track_add: 'closer_promotion_device_track.add',
    // 多点广告查询用户是否下载过app
    device_track_exists: 'closer_promotion_device_track.exists',
    // 查询推广活动配置列表
    activity_config_list: 'closer_promotion_activity_config.list',
    // 新建/修改 推广活动配置
    activity_config_add: 'closer_promotion_activity_config.add'
  },
  notify: {
    update_rules: 'closer_admin_notify.update_rules',
    get_notify_rules: 'closer_admin_notify.get_notify_rules',
    add_user: 'closer_admin_notify.add_user',
    update_user: 'closer_admin_notify.update_user',
    delete_user: 'closer_admin_notify.delete_user',
    all_user: 'closer_admin_notify.all_user',
    user_byphone: 'closer_admin_notify.user_byphone',
    user_bymail: 'closer_admin_notify.user_bymail',
    judge_user: 'closer_admin_notify.judge_user',
  },
  closer: {
    // 查询所有分类
    select_all: 'community_class.select_all',
    // 更新栏目对应的类别
    update_classref: 'community_class.update_classref',
    // 根据communityid获取属于的所有分类
    getclass_by_communityId: 'community_class.getclass_by_communityId',
    // 增加栏目分类
    insert_class: 'community_class.insert_class',
    // del栏目分类
    delete_class: 'community_class.delete_class',
    // update栏目分类
    update_class: 'community_class.update_class',
    // 查找栏目分类根据分类名称
    select_class: 'community_class.select_class',
    // 模糊查询所有，包括status=1和0的和
    select_class_like: 'community_class.select_class_like',
    // 修改栏目类别状态
    update_class_status: 'community_class.update_class_status'
  }
};
export default api