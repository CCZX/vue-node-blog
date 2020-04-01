// qiniuConfig
const qiniu = require('qiniu')

const accessKey = 'frWfpDLauQSLS9pLI5fIQEGTxMFnpqfHCrZXn1da'
const secretKey = 'otLFopTxILdZf8KX9hg1TCTUB1hXj9_SdhKrq1P_'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
  scope: 'chen-chao',
  expires: 7200
}

const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {uploadToken}


