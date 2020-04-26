package com.chinacreator.csx.yjsycb.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * AES加密
 * 
 * @author zwx
 *
 */
public class AESUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(AESUtil.class);
	private static final String KEY_ALGORITHM = "AES";
	private static final String DEFAULT_CIPHER_ALGORITHM = "AES/ECB/PKCS5Padding";// 默认的加密算法
	public static final String DEFAULT_KEY = "jysjcb";

	/**
	 * AES 加密操作
	 *
	 * @param content
	 *            待加密内容
	 * @param key
	 *            加密密钥
	 * @return 返回Base64转码后的加密数据
	 */
	public static String encrypt(String content, String key) {
		try {
			Cipher cipher = Cipher.getInstance(DEFAULT_CIPHER_ALGORITHM);// 创建密码器

			byte[] byteContent = content.getBytes("utf-8");

			cipher.init(Cipher.ENCRYPT_MODE, getSecretKey(key));// 初始化为加密模式的密码器

			byte[] result = cipher.doFinal(byteContent);// 加密

			return Base64.encodeBase64String(result);// 通过Base64转码返回

		} catch (Exception ex) {
			LOGGER.error("加密异常" + ex.getMessage());
		}
		return null;
	}

	/**
	 * AES 解密操作
	 *
	 * @param content
	 * @param key
	 * @return
	 */
	public static String decrypt(String content, String key) {

		try {
			// 实例化
			Cipher cipher = Cipher.getInstance(DEFAULT_CIPHER_ALGORITHM);
			// 使用密钥初始化，设置为解密模式
			cipher.init(Cipher.DECRYPT_MODE, getSecretKey(key));
			// 执行操作
			byte[] result = cipher.doFinal(Base64.decodeBase64(content));
			return new String(result, "utf-8");
		} catch (Exception ex) {
			LOGGER.error("解密异常" + ex.getMessage());
		}

		return null;
	}

	/**
	 * 生成加密秘钥
	 *
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private static SecretKeySpec getSecretKey(final String key) throws UnsupportedEncodingException {

		try {
			MessageDigest messageDigest;
			String encodeStr = "";
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(key.getBytes("utf-8"));
			encodeStr = byte2Hex(messageDigest.digest());
			List<Byte> keyByte = new ArrayList<Byte>();
			keyByte.addAll(Arrays.asList(ArrayUtils.toObject(encodeStr.getBytes("utf-8"))));
			Byte[] by = keyByte.toArray(new Byte[16]);
			Byte[] keyByte16 = new Byte[16];
			for (int i = 0; i < 16; i++) {
				keyByte16[i] = by[i];
			}
			return new SecretKeySpec(ArrayUtils.toPrimitive(keyByte16), KEY_ALGORITHM);// 转换为AES专用密钥
		} catch (Exception ex) {
			LOGGER.error("生成加密秘钥异常" + ex.getMessage());
		}
		return null;
	}

	private static String byte2Hex(byte[] bytes) {
		StringBuffer stringBuffer = new StringBuffer();
		String temp = null;
		for (int i = 0; i < bytes.length; i++) {
			temp = Integer.toHexString(bytes[i] & 0xFF);
			if (temp.length() == 1) {
				// 1得到一位的进行补0操作
				stringBuffer.append("0");
			}
			stringBuffer.append(temp);
		}
		return stringBuffer.toString();
	}
}
